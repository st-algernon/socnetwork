using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocNetwork.DTO.Response;
using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessengerController : ControllerBase
    {
        private readonly SocNetworkContext db;

        public MessengerController(SocNetworkContext context)
        {
            db = context;
        }

        [Authorize(Roles = "User")]
        [HttpGet("chat/{userId}")]
        public async Task<IActionResult> Get(string userId)
        {
            var currentUser = HttpContext.Items["User"] as User;
            var withUser = await db.Users.FirstOrDefaultAsync(u => u.Id.ToString() == userId);

            if (withUser == null)
            {
                return BadRequest(new ConversationResponse {
                    Result = false,
                    Errors = new List<string>() { "No user with this id was found" }
                });
            }

            var members = new List<User>() { currentUser, withUser };

            var conversation = await db.Conversations.FirstOrDefaultAsync(c => c.Members.Except(members).Any() == false);
            
            if (conversation == null)
            {
                conversation = new Conversation()
                {
                    Id = Guid.NewGuid(),
                    Members = members,
                    IsDeleted = false,
                    CreationDate = DateTime.Now
                };

                db.Conversations.Add(conversation);
                await db.SaveChangesAsync();
            }

            return Ok(new ConversationResponse
            {
                Result = true,
                Conversation = conversation,
            });
        }

        // POST api/<MessengerController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<MessengerController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<MessengerController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
