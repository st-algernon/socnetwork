using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    public class RelationshipsController : ControllerBase
    {
        private readonly SocNetworkContext db;

        public RelationshipsController(SocNetworkContext context)
        {
            db = context;
        }

        [HttpGet("with/{username}")]
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

        [HttpPut("follow/{username}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Follow(string username)
        {

            var toUser = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (toUser == null)
            {
                return BadRequest();
            }

            var currentUser = HttpContext.Items["User"] as User;

            var relationshipsHelper = new RelationshipsHelper(db);

            var ur = relationshipsHelper.Get(currentUser, toUser) ?? relationshipsHelper.Create(currentUser, toUser);
            relationshipsHelper.Update(ur, UserRelationshipType.Followed);

            return Ok();
        }

        [HttpPut("block/{username}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Block(string username)
        {

            var toUser = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (toUser == null)
            {
                return BadRequest();
            }

            var currentUser = HttpContext.Items["User"] as User;

            var relationshipsHelper = new RelationshipsHelper(db);

            var ur = relationshipsHelper.Get(currentUser, toUser) ?? relationshipsHelper.Create(currentUser, toUser);
            relationshipsHelper.Update(ur, UserRelationshipType.Blocked);

            return Ok();
        }

        [HttpDelete("unfollow/{username}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Unfollow(string username)
        {

            var toUser = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (toUser == null)
            {
                return BadRequest();
            }

            var currentUser = HttpContext.Items["User"] as User;

            var relationshipHelper = new RelationshipsHelper(db);

            var ur = relationshipHelper.Get(currentUser, toUser);
            relationshipHelper.Remove(ur);

            return NoContent();
        }
    }
}
