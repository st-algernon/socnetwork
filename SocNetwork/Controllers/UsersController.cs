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
            var user = await db.Users
                .Include(u => u.ProfileMedia)
                .FirstOrDefaultAsync(u => u.Username == username);

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
            var user = await db.Users
                .Include(u => u.ProfileMedia)
                .FirstOrDefaultAsync(u => u.Username == username);

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
            var user = await db.Users
                .Include(u => u.ProfileMedia)
                .FirstOrDefaultAsync(u => u.Username == username);

            if (user == null) {
                return BadRequest(new ShortProfilesResponse()
                {
                    Result = false,
                    Errors = new List<string> { "User doesn't exist" }
                });
            }

            var followers = await db.UserRelationships
                .Where(ur => ur.ToUserId == user.Id && ur.UserRelationshipType == UserRelationshipType.Followed)
                .OrderBy(ur => ur.CreationDate)
                .Skip((usersPageParams.Number - 1) * usersPageParams.Size)
                .Take(usersPageParams.Size)
                .Include(ur => ur.FromUser)
                .Select(ur => ur.FromUser)
                .ToListAsync();

            var followerDTOs = new List<ShortProfileDTO>();

            followers.ForEach(u => {
                followerDTOs.Add(ConvertHelper.ToShortProfileDTO(u));
            });

            return Ok(new ShortProfilesResponse
            { 
                Result = true,
                ShortProfiles = followerDTOs
            });
        }

        [HttpGet("{username}/following")]
        public async Task<IActionResult> GetFollowings(string username, [FromQuery] UsersPageParams usersPageParams)
        {
            var user = await db.Users
                .Include(u => u.ProfileMedia)
                .FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
                return BadRequest(new ProfileResponse()
                {
                    Result = false,
                    Errors = new List<string> { "Username doesn't exist" }
                });

            var followings = await db.UserRelationships
                .Where(ur => ur.FromUserId == user.Id && ur.UserRelationshipType == UserRelationshipType.Followed)
                .OrderBy(ur => ur.CreationDate)
                .Skip((usersPageParams.Number - 1) * usersPageParams.Size)
                .Take(usersPageParams.Size)
                .Include(ur => ur.ToUser)
                .Select(ur => ur.ToUser)
                .ToListAsync();

            var followingDTOs = new List<ShortProfileDTO>();

            followings.ForEach(u => {
                followingDTOs.Add(ConvertHelper.ToShortProfileDTO(u));
            });

            return Ok(new ShortProfilesResponse
            {
                Result = true,
                ShortProfiles = followingDTOs
            });
        }

        [HttpGet("blocked")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetBlocked()
        {
            User currentUser = HttpContext.Items["User"] as User;

            var blocked = await db.UserRelationships
                .Where(u => u.FromUserId == currentUser.Id && u.UserRelationshipType == UserRelationshipType.Blocked)
                .Include(u => u.ToUser)
                .Select(u => u.ToUser)
                .ToListAsync();

            var blockedDTOs = new List<ShortProfileDTO>();

            blocked.ForEach(u => blockedDTOs.Add(ConvertHelper.ToShortProfileDTO(u)));

            return Ok(new ShortProfilesResponse
            {
                Result = true,
                ShortProfiles = blockedDTOs
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

        [HttpGet("search/{query}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> SearchUsers(string query, [FromQuery] UsersPageParams usersPageParams)
        {
            var searchResults = new List<ShortProfileDTO>();

            if (query.StartsWith('@'))
            {
                var username = query.Substring(1);

                if (username.Length != 0)
                {
                    searchResults = await db.Users
                        .Where(u => EF.Functions.Like(u.Username, $"%{username}%"))
                        .Include(u => u.ProfileMedia)
                        .Select(u => ConvertHelper.ToShortProfileDTO(u))
                        .ToListAsync();
                }
            } 
            else
            {
                searchResults = await db.Users
                .Where(u => EF.Functions.Like(u.Name, $"%{query}%"))
                .Include(u => u.ProfileMedia)
                .Select(u => ConvertHelper.ToShortProfileDTO(u))
                .ToListAsync();
            }

            return Ok(new ShortProfilesResponse
            {
                Result = true,
                ShortProfiles = searchResults
            });
        }

        [HttpGet("suggestions")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetSuggestions([FromQuery] UsersPageParams usersPageParams)
        {
            User currentUser = HttpContext.Items["User"] as User;

            var followings = await db.UserRelationships
                .Where(ur => ur.FromUserId == currentUser.Id && ur.UserRelationshipType == UserRelationshipType.Followed)
                .Select(ur => ur.ToUser )
                .ToListAsync();

            var users = await db.Users.ToListAsync();

            var suggestionDTOs = users
                .Except(followings)
                .OrderBy(ur => ur.CreationDate)
                .Skip((usersPageParams.Number - 1) * usersPageParams.Size)
                .Take(usersPageParams.Size)
                .Select(u => ConvertHelper.ToShortProfileDTO(u))
                .ToList();

            return Ok(new ShortProfilesResponse
            {
                Result = true,
                ShortProfiles = suggestionDTOs
            });
        }
    }
}
