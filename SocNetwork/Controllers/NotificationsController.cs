using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    public class NotificationsController : ControllerBase
    {
        private readonly SocNetworkContext db;

        public NotificationsController(SocNetworkContext context)
        {
            db = context;
        }

        //[HttpGet]
        //public async Task<IActionResult> GetCurrentUserNotifs()
        //{
        //    var currentUser = HttpContext.Items["User"] as User;
        //    var notifs = new List<Notification>();
        //    var postNotifs = await db.PostNotifications.Where(pn => pn.Recipient == currentUser).ToListAsync();
        //    var userNotifs = await db.UserNotifications.Where(pn => pn.Recipient == currentUser).ToListAsync();
        //    var commentNotifs = await db.CommentNotifications.Where(pn => pn.Recipient == currentUser).ToListAsync();
            
        //    notifs.Add()

        //    return 
        //}
    }
}
