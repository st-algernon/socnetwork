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
        public async Task<IActionResult> GetShortChatWith(string userId)
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

            var chat = new Chat();
            var chatHelper = new ChatHelper(db);

            if (withUser != currentUser)
            {
                var members = new List<User>() { currentUser, withUser };
                chat = await chatHelper.GetChatByMembersAsync(members) ?? await chatHelper.CreateChatAsync(members);
            } else {
                chat = await chatHelper.CreateSavedMessages(currentUser);
            }

            var shortChatDTO = ConvertHelper.ToShortChatDTO(chat, currentUser);

            return Ok(new ShortChatsResponse
            {
                Result = true,
                ShortChats = new List<ShortChatDTO> { shortChatDTO }
            });
        }

        [Authorize(Roles = "User")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetChatById(string id)
        {
            var chatHelper = new ChatHelper(db);
            var currentUser = HttpContext.Items["User"] as User;
            var currentUserChats = await chatHelper.GetUserChatsAsync(currentUser);

            var chat = await db.Chats.FirstOrDefaultAsync(c => c.Id.ToString() == id);

            if (chat == null)
            {
                return BadRequest(new ProfileResponse()
                {
                    Result = false,
                    Errors = new List<string>() { "Chat not found" }
                });
            }

            var isMine = currentUserChats.Contains(chat);

            if (isMine == false)
            {
                return BadRequest(new ProfileResponse()
                {
                    Result = false,
                    Errors = new List<string>() { "You do not have access to this chat" }
                });
            }

            var chatDTO = ConvertHelper.ToChatDTO(chat, currentUser);

            return Ok(new ChatResponse()
            {
                Result = true,
                Chat = chatDTO
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
