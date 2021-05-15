using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SocNetwork.DTO;
using SocNetwork.DTO.Request;
using SocNetwork.Extensions;
using SocNetwork.Helpers;
using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Hubs
{
    [Authorize]
    public class MessengerHub : Hub
    {
        private readonly SocNetworkContext db;

        public MessengerHub(SocNetworkContext context)
        {
            db = context;
        }

        public async Task Send(MessageDTO messageDTO)
        {
            var chat = await db.Conversations
                .Include(c => c.Members)
                .FirstOrDefaultAsync(c => c.Id == messageDTO.ConversationId);
            var memberIds = chat.Members.Select(m => m.Id.ToString());
            var caller = Context.User.Identity.Name;

            if (memberIds.Contains(caller))
            {
                var messagesHelper = new MessagesHelper(db);
                var message = messagesHelper.ConvertFromDTO(messageDTO);

                await db.Messages.AddAsync(message);
                await db.SaveChangesAsync();

                messageDTO = messagesHelper.ConvertToDTO(message);
                await Clients.Users(memberIds).SendAsync("Receive", messageDTO);
            }
        }
    }
}
