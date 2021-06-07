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
    public class ChatsController : ControllerBase
    {
        private readonly SocNetworkContext db;

        public ChatsController(SocNetworkContext context)
        {
            db = context;
        }

        [Authorize(Roles = "User")]
        [HttpGet]
        public async Task<IActionResult> GetCurrentUserChats()
        {
            var currentUser = HttpContext.Items["User"] as User;
            var chatHelper = new ChatHelper(db);
            var chats = await chatHelper.GetUserChatsAsync(currentUser);
            var shortChatDTOs = new List<ShortChatDTO>();

            chats.ForEach(c => {
                shortChatDTOs.Add(ConvertHelper.ToShortChatDTO(c, currentUser));
            });

            return Ok(new ShortChatsResponse {
                Result = true,
                ShortChats = shortChatDTOs
            });
        }

        [Authorize(Roles = "User")]
        [HttpGet("with/{userId}")]
        public async Task<IActionResult> GetChatWith(string userId)
        {
            var currentUser = HttpContext.Items["User"] as User;
            var withUser = await db.Users.FirstOrDefaultAsync(u => u.Id.ToString() == userId);

            if (withUser == null)
            {
                return BadRequest(new ShortChatsResponse {
                    Result = false,
                    Errors = new List<string>() { "No user with this id was found" }
                });
            }

            var members = new List<User>() { currentUser, withUser };
            var chatHelper = new ChatHelper(db);
            var chat = await chatHelper.GetChatByMembersAsync(members) ?? await chatHelper.CreateChatAsync(members);
            var chatDTO = chatHelper.ConvertToChatDTO(chat);

            return Ok(new ShortChatsResponse
            {
                Result = true,
                ShortChats = new List<ChatDTO> { chatDTO }
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
