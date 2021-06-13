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
    [Authorize(Roles = "User")]
    [Route("api/[controller]")]
    [ApiController]
    public class ChatsController : ControllerBase
    {
        private readonly SocNetworkContext db;

        public ChatsController(SocNetworkContext context)
        {
            db = context;
        }

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

            var chatHelper = new ChatHelper(db);
            var members = new List<User>() { currentUser, withUser };
            var chat = await chatHelper.GetChatByMembersAsync(members) 
                ?? await chatHelper.CreateChatAsync(members);

            var shortChatDTO = ConvertHelper.ToShortChatDTO(chat, currentUser);

            return Ok(new ShortChatsResponse
            {
                Result = true,
                ShortChats = new List<ShortChatDTO> { shortChatDTO }
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetChatById(string id)
        {
            var chatHelper = new ChatHelper(db);
            var currentUser = HttpContext.Items["User"] as User;
            var currentUserChats = await chatHelper.GetUserChatsAsync(currentUser);

            var chat = await db.Chats
                .Include(c => c.Messages)
                .ThenInclude(m => m.MessageMedia)
                .FirstOrDefaultAsync(c => c.Id.ToString() == id);

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
    }
}
