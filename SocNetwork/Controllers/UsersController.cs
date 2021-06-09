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

        [HttpGet("current")]
        [Authorize(Roles = "User")]
        public IActionResult GetCurrentUser()
        {
            var currentUser = HttpContext.Items["User"] as User;

            var shortProfileDTO = ConvertHelper.ToShortProfileDTO(currentUser);

            return Ok(new ShortProfilesResponse()
            {
                Result = true,
                ShortProfiles = new List<ShortProfileDTO> { shortProfileDTO }
            });
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                return BadRequest(new ProfileResponse()
                {
                    Result = false,
                    Errors = new List<string>() { "User not found" }
                });
            }

            var profileDTO = ConvertHelper.ToProfileDTO(user);

            return Ok(new ProfileResponse() 
            {
                Result = true,
                Profile = profileDTO
            });
        }

        [HttpGet("short/{username}")]
        public async Task<IActionResult> GetShortProfile(string username)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                return BadRequest(new ProfileResponse()
                {
                    Result = false,
                    Errors = new List<string>() { "User not found" }
                });
            }

            var shortProfileDTO = ConvertHelper.ToShortProfileDTO(user);

            return Ok(new ShortProfilesResponse()
            {
                Result = true,
                ShortProfiles = new List<ShortProfileDTO> { shortProfileDTO }
            });
        }

        [HttpGet("{username}/followers")]
        public async Task<IActionResult> GetFollowers(string username, [FromQuery] UsersPageParams usersPageParams)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null) {
                return BadRequest(new ShortProfilesResponse()
                {
                    Result = false,
                    Errors = new List<string> { "Users doesn't exist" }
                });
            }

            var followers = await db.UserRelationships
                .Where(ur => ur.ToUserId == user.Id && ur.UserRelationshipType == UserRelationshipType.Followed)
                .OrderBy(ur => ur.CreationDate)
                .Skip((usersPageParams.Number - 1) * usersPageParams.Size)
                .Take(usersPageParams.Size)
                .Include(ur => ur.FromUser)
                .Select(ur => new { ur.FromUser })
                .ToListAsync();

            var followersDTO = new List<ShortProfileDTO>();

            followers.ForEach(f => {
                followersDTO.Add(ConvertHelper.ToShortProfileDTO(f.FromUser));
            });

            return Ok(new ShortProfilesResponse
            { 
                Result = true,
                ShortProfiles = followersDTO
            });
        }

        [HttpGet("{username}/following")]
        public async Task<IActionResult> GetFollowing(string username, [FromQuery] UsersPageParams usersPageParams)
        {
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

            var followingDTO = new List<ShortProfileDTO>();

            following.ForEach(f => followingDTO.Add(ConvertHelper.ToShortProfileDTO(f.ToUser)));

            return Ok(new ShortProfilesResponse
            {
                Result = true,
                ShortProfiles = followingDTO
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

            var blockedDTO = new List<ShortProfileDTO>();

            blocked.ForEach(f => blockedDTO.Add(ConvertHelper.ToShortProfileDTO(f.ToUser)));

            return Ok(new ShortProfilesResponse
            {
                Result = true,
                ShortProfiles = blockedDTO
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
                request.CopyPropertiesTo(currentUser);

                db.Users.Update(currentUser);

                await db.SaveChangesAsync();

                return Ok();
            } 
            else
            {
                return Forbid();
            }
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

            var mediaDTOs = new List<ProfileMediaDTO>();

            user.ProfileMedia.ForEach(m =>
            {
                mediaDTOs.Add(ConvertHelper.ToProfileMediaDTO(m));
            });

            return Ok(new ProfileMediaResponse
            {
                Result = true,
                Media = mediaDTOs
            });
        }
    }
}
