using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocNetwork.DTO;
using SocNetwork.DTO.Response;
using SocNetwork.Extensions;
using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
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

        // [Authorize(Roles="User")]
        // [HttpGet("/me")]
        // public RedirectToAction Get() {
        //     return new RedirectToActionResult("Get", HttpContext.Items["User"]);
        // }

        [HttpGet("{username}")]
        public async Task<IActionResult> Get(string username)
        {
            var user = await db.Users
                .Include(u => u.ProfileMedia)
                .FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
                return NotFound(new UsersResponse()
                {
                    Result = false,
                    Errors = new List<string>() { "User not found" }
                }); 

            UserDTO userDTO = new UserDTO();

            user.CopyPropertiesTo<User, UserDTO>(userDTO);

            userDTO.PathToAvatar = user.ProfileMedia
                .FirstOrDefault(pm => pm.IsCurrent && pm.MediaFor == MediaFor.Avatar)
                .Path;
            userDTO.PathToCover = user.ProfileMedia
                .FirstOrDefault(pm => pm.IsCurrent && pm.MediaFor == MediaFor.Cover)
                .Path;

            return Ok(new UsersResponse() 
            {
                Result = true,
                Users = new List<UserDTO>() { userDTO }
            });
        }

        [HttpGet("{username}/followers")]
        public async Task<IActionResult> Followers(string username)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
                return BadRequest();

            var followers = await db.UserRelationships.Where(u => u.ToUserId == user.Id 
                && u.UserRelationshipType == UserRelationshipType.Followed).ToListAsync();

            return Ok(followers);
        }

        [HttpGet("{username}/following")]
        public async Task<IActionResult> Following(string username)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
                return BadRequest(new UsersResponse()
                {
                    Result = false,
                    Errors = new List<string> { "Username doesn't exist" }
                });

            var followers = await db.UserRelationships.Include(u => u.ToUser)
                .Where(u => u.FromUserId == user.Id && u.UserRelationshipType == UserRelationshipType.Followed)
                .Select(u => new { u.ToUser }).ToListAsync();

            return Ok(new UsersResponse()
            { 
                Result = true,
                //Users = followers
            });
        }

        [HttpGet("{username}/blocked")]
        public string Blocked(string username)
        {
            return "blocked";
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        [HttpPut]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Put([FromBody] EditProfileRequest request)
        {
            User currentUser = HttpContext.Items["User"] as User;

            if (request == null)
            {
                return BadRequest();
            }
            else if (currentUser.Id.ToString() == request.Id)
            {
                request.CopyPropertiesTo<EditProfileRequest, User>(currentUser);

                db.Users.Update(currentUser);

                await db.SaveChangesAsync();

                return Ok();
            } 
            else
            {
                return Forbid();
            }
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
