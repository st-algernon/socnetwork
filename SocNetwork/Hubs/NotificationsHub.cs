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

        public async void PostNotify(PostNotifRequest request)
        {
            var callerId = Context.User.Identity.Name;
            var postNotif = new PostNotification
            {
                SenderId = Guid.Parse(callerId),
                RecipientId = Guid.Parse(request.RecipientId),
                PostId = Guid.Parse(request.PostId),
                NotifType = (PostNotifType)Enum.Parse(typeof(PostNotifType), request.NotifType),
                CreationDate = DateTime.Now
            };

            await db.PostNotifications.AddAsync(postNotif);
            await db.SaveChangesAsync();

            var postNotifDTO = ConvertHelper.ToPostNotifDTO(postNotif);

            await Clients.Users(request.RecipientId).SendAsync("ReceivePostNotif", postNotifDTO);
        }

        public async void UserNotify(PostNotifRequest request)
        {
            var callerId = Context.User.Identity.Name;
            var userNotif = new UserNotification
            {
                SenderId = Guid.Parse(callerId),
                RecipientId = Guid.Parse(request.RecipientId),
                NotifType = (UserNotifType)Enum.Parse(typeof(UserNotifType), request.NotifType),
                CreationDate = DateTime.Now
            };

            await db.UserNotifications.AddAsync(userNotif);
            await db.SaveChangesAsync();

            var userNotifDTO = ConvertHelper.ToUserNotifDTO(userNotif);

            await Clients.Users(request.RecipientId).SendAsync("ReceiveUserNotif", userNotifDTO);
        }
    }
}
