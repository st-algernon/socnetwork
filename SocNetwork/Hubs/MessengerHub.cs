using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SocNetwork.DTO.Request;
using SocNetwork.Extensions;
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

        public async Task Send(ChatRequest chatRequest, MessageRequest messageRequest)
        {
            var message = new Message();
            messageRequest.CopyPropertiesTo(message);
            message.ConversationId = Guid.Parse(chatRequest.Id.ToString());
            await db.Messages.AddAsync(message);
            await Clients.Users(chatRequest.MembersId).SendAsync("Receive", chatRequest, messageRequest);
        }
    }
}
