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

        public async Task Send(MessageRequest request)
        {
            var chat = await db.Chats
                .Include(c => c.Members)
                .ThenInclude(m => m.ProfileMedia)
                .FirstOrDefaultAsync(c => c.Id.ToString() == request.ChatId);
            var memberIds = chat.Members.Select(m => m.Id.ToString());
            var caller = Context.User.Identity.Name;

            if (memberIds.Contains(caller))
            {
                var message = new Message
                {
                    AuthorId = Guid.Parse(request.AuthorId),
                    ChatId = Guid.Parse(request.ChatId),
                    Text = request.Text,
                    CreationDate = DateTime.Now
                };

                await db.Messages.AddAsync(message);

                foreach (var mediaDTO in request.MediaDTOs)
                {
                    await db.MessageMedia.AddAsync(new MessageMedia
                    {
                        MessageId = message.Id,
                        Path = mediaDTO.Path,
                        MimeType = mediaDTO.MimeType,
                        Size = mediaDTO.Size,
                        CreationDate = mediaDTO.CreationDate
                    });
                }

                await db.SaveChangesAsync();

                var messageDTO = ConvertHelper.ToMessageDTO(message);
                await Clients.Users(memberIds).SendAsync("Receive", messageDTO);
            }
        }
    }
}
