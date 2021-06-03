using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocNetwork.DTO;
using SocNetwork.DTO.Request;
using SocNetwork.DTO.Response;
using SocNetwork.Extensions;
using SocNetwork.Helpers;
using SocNetwork.Models;
using SocNetwork.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly SocNetworkContext db;

        public UsersController(SocNetworkContext context)
        {
            db = context;
        }
        // // GET: api/<UserController>
        // [HttpGet("name/{name}")]
        // public async Task<IActionResult> Get(string name)
        // {
        //     List<User> users = await db.Users.Where(u => u.Name == name).ToListAsync();

        //     List<UserDTO> usersDTO = new List<UserDTO>();

        //     users.ForEach(u => {
        //             var userDTO = new UserDTO();
        //             u.CopyPropertiesTo<User, UserDTO>(userDTO);
        //             usersDTO.Add(userDTO);
        //         }
        //     );

        //     return Ok(new UsersResponse()
        //     {
        //         Result = true,
        //         Users = usersDTO
        //     });
        // }

        [HttpGet("me")]
        [Authorize(Roles = "User")]
        public IActionResult GetCurrentUser()
        {
            var currentUser = HttpContext.Items["User"] as User;

            return Ok(new { username = currentUser.Username });
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> Get(string username)
        {
            var user = await db.Users.AnyAsync(u => u.Username == username);

            if (user == false)
            {
                return BadRequest(new ProfileResponse()
                {
                    Result = false,
                    Errors = new List<string>() { "User not found" }
                });
            }

            var usersHelper = new UsersHelper(db);

            var profileDTO = usersHelper.GetProfileDTO(username);

            return Ok(new ProfileResponse() 
            {
                Result = true,
                Profile = profileDTO
            });
        }

        
        [HttpGet("relationship-with/{username}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetRelationshipWith(string username)
        {
            var toUser = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (toUser == null)
            {
                return BadRequest();
            }

            var currentUser = HttpContext.Items["User"] as User;

            var relationshipsHelper = new RelationshipsHelper(db);

            var ur = relationshipsHelper.GetOrDefault(currentUser, toUser);

            return Ok(ur);
        }

        [HttpGet("{username}/followers")]
        public async Task<IActionResult> GetFollowers(string username)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null) {
                return BadRequest(new ProfileResponse()
                {
                    Result = false,
                    Errors = new List<string> { "User doesn't exist" }
                });
            }

            var followers = await db.UserRelationships
                .Where(u => u.ToUserId == user.Id && u.UserRelationshipType == UserRelationshipType.Followed)
                .Include(u => u.FromUser)
                .Select(u => new { u.FromUser })
                .ToListAsync();

            var usersHelper = new UsersHelper(db);
            var followersDTO = new List<ProfileDTO>();

            followers.ForEach(f => followersDTO.Add(usersHelper.GetProfileDTO(f.FromUser)));

            return Ok(new ProfilesResponse
            { 
                Result = true,
                Profiles = followersDTO
            });
        }

        [HttpGet("{username}/following")]
        public async Task<IActionResult> GetFollowing(string username, [FromQuery] UsersPageParams usersPageParams)
        {
            var h = HttpContext;
            var user = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
                return BadRequest(new ProfileResponse()
                {
                    Result = false,
                    Errors = new List<string> { "Username doesn't exist" }
                });

            var following = await db.UserRelationships
                .Where(ur => ur.FromUserId == user.Id && ur.UserRelationshipType == UserRelationshipType.Followed)
                .OrderBy(ur => ur.CreationDate)
                .Skip((usersPageParams.Number - 1) * usersPageParams.Size)
                .Take(usersPageParams.Size)
                .Include(ur => ur.ToUser)
                .Select(ur => new { ur.ToUser })
                .ToListAsync();

            var usersHelper = new UsersHelper(db);
            var followingDTO = new List<ProfileDTO>();

            following.ForEach(f => followingDTO.Add(usersHelper.GetProfileDTO(f.ToUser)));

            return Ok(new ProfilesResponse
            {
                Result = true,
                Profiles = followingDTO
            });
        }

        [HttpGet("blocked")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetBlocked()
        {
            User currentUser = HttpContext.Items["User"] as User;

            var blocked = await db.UserRelationships
                .Where(u => u.FromUserId == currentUser.Id && u.UserRelationshipType == UserRelationshipType.Blocked)
                .Select(u => new { u.ToUser })
                .Include(u => u.ToUser)
                .ToListAsync();

            var usersHelper = new UsersHelper(db);
            var blockedDTO = new List<ProfileDTO>();

            blocked.ForEach(f => blockedDTO.Add(usersHelper.GetProfileDTO(f.ToUser)));

            return Ok(new ProfilesResponse
            {
                Result = true,
                Profiles = blockedDTO
            });
        }

        [HttpPut("edit")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> EditProfile([FromBody] EditProfileInfoRequest request)
        {
            User currentUser = HttpContext.Items["User"] as User;

            if (request == null)
            {
                return BadRequest();
            }
            else if (currentUser.Id.ToString() == request.Id)
            {
                request.CopyPropertiesTo<EditProfileInfoRequest, User>(currentUser);

                db.Users.Update(currentUser);

                await db.SaveChangesAsync();

                return Ok();
            } 
            else
            {
                return Forbid();
            }
        }

        [HttpPut("follow/{username}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Follow(string username) {

            var toUser = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (toUser == null) {
                return BadRequest();
            }

            var currentUser = HttpContext.Items["User"] as User;

            var relationshipsHelper = new RelationshipsHelper(db);

            var ur = relationshipsHelper.CreateOrExisting(currentUser, toUser);
            relationshipsHelper.Update(ur, UserRelationshipType.Followed);

            return Ok();
        }

        [HttpPut("block/{username}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Block(string username) {

            var toUser = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (toUser == null) {
                return BadRequest();
            }

            var currentUser = HttpContext.Items["User"] as User;

            var relationshipHelper = new RelationshipsHelper(db);

            var ur = relationshipHelper.CreateOrExisting(currentUser, toUser);
            relationshipHelper.Update(ur, UserRelationshipType.Blocked);
        
            return Ok();
        }
        
        [HttpDelete("unfollow/{username}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Unfollow(string username) {

            var toUser = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (toUser == null) {
                return BadRequest();
            }

            var currentUser = HttpContext.Items["User"] as User;

            var relationshipHelper = new RelationshipsHelper(db);

            var ur = relationshipHelper.GetOrDefault(currentUser, toUser);
            relationshipHelper.Remove(ur);

            return NoContent();
        }

        [HttpGet("{username}/media")]
        public async Task<IActionResult> GetProfileMedia(string username)
        {
            var user = await db.Users
                .Include(u => u.ProfileMedia)
                .FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                return BadRequest(new ProfileMediaResponse()
                {
                    Result = false,
                    Errors = new List<string>() { "User not found" }
                });
            }

            var usersHelper = new UsersHelper(db);
            var mediaDTO = usersHelper.GetProfileMediaDTO(user);

            return Ok(new ProfileMediaResponse
            {
                Result = true,
                Media = mediaDTO
            });
        }
    }
}
