using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SocNetwork.DTO;
using SocNetwork.DTO.Request;
using SocNetwork.Helpers;
using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Hubs
{
    [Authorize]
    public class NotificationsHub : Hub
    {
        private readonly SocNetworkContext db;

        public NotificationsHub(SocNetworkContext context)
        {
            db = context;
        }

        public async Task Notify(NotificRequest request)
        {
            var callerId = Context.User.Identity.Name;
            var caller = await db.Users
                .Include(u => u.ProfileMedia)
                .FirstOrDefaultAsync(u => u.Id == Guid.Parse(callerId));

            if (callerId != request.RecipientId)
            {
                var notific = await db.Notifications.FirstOrDefaultAsync(n =>
                    n.SenderId == caller.Id &&
                    n.RecipientId == Guid.Parse(request.RecipientId) &&
                    n.SubjectId.ToString() == request.SubjectId &&
                    n.SubjectType == (SubjectType)request.SubjectType &&
                    n.NotificType == (NotificType)request.NotificType
                );

                if (notific == null)
                {
                    notific = new Notification
                    {
                        SenderId = caller.Id,
                        RecipientId = Guid.Parse(request.RecipientId),
                        SubjectType = (SubjectType)request.SubjectType,
                        NotificType = (NotificType)request.NotificType,
                        CreationDate = DateTime.UtcNow
                    };

                    if (string.IsNullOrEmpty(request.SubjectId) == false)
                    {
                        notific.SubjectId = Guid.Parse(request.SubjectId);
                    }

                    await db.Notifications.AddAsync(notific);
                }

                await db.SaveChangesAsync();

                var notificDTO = ConvertHelper.ToNotificationDTO(notific);

                await Clients.Users(request.RecipientId).SendAsync("ReceiveNotific", notificDTO);
            }
        }
    }
}
