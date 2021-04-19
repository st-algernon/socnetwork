using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocNetwork.DTO;
using SocNetwork.DTO.Request;
using SocNetwork.DTO.Response;
using SocNetwork.Extensions;
using SocNetwork.Helpers;
using SocNetwork.Models;
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
        public IActionResult Get()
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

        [HttpGet("{username}/followers")]
        public async Task<IActionResult> Followers(string username)
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

            var followersDTO = new List<ProfileDTO>();
            var usersHelper = new UsersHelper(db);

            followers.ForEach(f => {
                    var fDTO = usersHelper.GetProfileDTO(f.FromUser);
                    followersDTO.Add(fDTO);
            });

            return Ok(new ProfilesResponse
            { 
                Result = true,
                Profiles = followersDTO
            });
        }

        [HttpGet("{username}/following")]
        public async Task<IActionResult> Following(string username)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
                return BadRequest(new ProfileResponse()
                {
                    Result = false,
                    Errors = new List<string> { "Username doesn't exist" }
                });

            var following = await db.UserRelationships
                .Where(u => u.FromUserId == user.Id && u.UserRelationshipType == UserRelationshipType.Followed)
                .Include(u => u.ToUser)
                .Select(u => new { u.ToUser })
                .ToListAsync();

            var followingDTO = new List<ProfileDTO>();
            var usersHelper = new UsersHelper(db);

            following.ForEach(f => {
                var fDTO = usersHelper.GetProfileDTO(f.ToUser);
                followingDTO.Add(fDTO);
            });

            return Ok(new ProfilesResponse
            {
                Result = true,
                Profiles = followingDTO
            });
        }

        [HttpGet("blocked")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Blocked()
        {
            User currentUser = HttpContext.Items["User"] as User;

            var blocked = await db.UserRelationships
                .Where(u => u.FromUserId == currentUser.Id && u.UserRelationshipType == UserRelationshipType.Blocked)
                .Select(u => new { u.ToUser })
                .Include(u => u.ToUser)
                .ToListAsync();

            var blockedDTO = new List<ProfileDTO>();
            var usersHelper = new UsersHelper(db);

            blocked.ForEach(f => {
                var fDTO = usersHelper.GetProfileDTO(f.ToUser);
                blockedDTO.Add(fDTO);
            });

            return Ok(new ProfilesResponse
            {
                Result = true,
                Profiles = blockedDTO
            });
        }

        [HttpPut]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Put([FromBody] EditProfileInfoRequest request)
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

        [HttpPut("follow")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Follow(string toUserId) {

            var toUser = await db.Users.FirstOrDefaultAsync(u => u.Id.ToString() == toUserId);

            if (toUser == null) {
                return BadRequest();
            }

            var currentUser = HttpContext.Items["User"] as User;

            var relationshipsHelper = new RelationshipsHelper(db);

            var ur = relationshipsHelper.CreateOrExist(currentUser, toUser);
            relationshipsHelper.Update(ur, UserRelationshipType.Followed);

            return Ok();
        }

        [HttpPut("block")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Block(string toUserId) {

            var toUser = await db.Users.FirstOrDefaultAsync(u => u.Id.ToString() == toUserId);

            if (toUser == null) {
                return BadRequest();
            }

            var currentUser = HttpContext.Items["User"] as User;

            var relationshipHelper = new RelationshipsHelper(db);

            var ur = relationshipHelper.CreateOrExist(currentUser, toUser);
            relationshipHelper.Update(ur, UserRelationshipType.Blocked);
        
            return Ok();
        }
        
        [HttpDelete("unfollow")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Unfollow(string toUserId) {

            var toUser = await db.Users.FirstOrDefaultAsync(u => u.Id.ToString() == toUserId);

            if (toUser == null) {
                return BadRequest();
            }

            var currentUser = HttpContext.Items["User"] as User;

            var relationshipHelper = new RelationshipsHelper(db);

            var ur = relationshipHelper.Get(currentUser, toUser);
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
