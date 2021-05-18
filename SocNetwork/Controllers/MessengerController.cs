using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocNetwork.DTO;
using SocNetwork.DTO.Response;
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
    public class MessengerController : ControllerBase
    {
        private readonly SocNetworkContext db;

        public MessengerController(SocNetworkContext context)
        {
            db = context;
        }

        [Authorize(Roles = "User")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var currentUser = HttpContext.Items["User"] as User;
            var chatHelper = new ChatHelper(db);
            var chats = await chatHelper.GetUserChatsAsync(currentUser);
            var chatsDTO = new List<ChatDTO>();

            chats.ForEach(c => {
                chatsDTO.Add(chatHelper.ConvertToDTO(c));
            });

            return Ok(new ChatsResponse {
                Result = true,
                Chats = chatsDTO
            });
        }

        [Authorize(Roles = "User")]
        [HttpGet("chat/{userId}")]
        public async Task<IActionResult> GetChatByUserId(string userId)
        {
            var currentUser = HttpContext.Items["User"] as User;
            var withUser = await db.Users.FirstOrDefaultAsync(u => u.Id.ToString() == userId);

            if (withUser == null)
            {
                return BadRequest(new ChatsResponse {
                    Result = false,
                    Errors = new List<string>() { "No user with this id was found" }
                });
            }

            var members = new List<User>() { currentUser, withUser };
            var chatHelper = new ChatHelper(db);
            var chat = await chatHelper.GetChatByMembersAsync(members) ?? await chatHelper.CreateChatAsync(members);
            var chatDTO = chatHelper.ConvertToDTO(chat);

            return Ok(new ChatsResponse
            {
                Result = true,
                Chats = new List<ChatDTO> { chatDTO }
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
