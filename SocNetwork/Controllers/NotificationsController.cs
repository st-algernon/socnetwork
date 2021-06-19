using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    public class NotificationsController : ControllerBase
    {
        private readonly SocNetworkContext db;

        public NotificationsController(SocNetworkContext context)
        {
            db = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCurrentUserNotifs()
        {
            var currentUser = HttpContext.Items["User"] as User;

            var postNotifDTOs = await db.Notifications
                .Where(n => n.Recipient == currentUser)
                .Include(n => n.Sender)
                .ThenInclude(u => u.ProfileMedia)
                .OrderByDescending(n => n.CreationDate)
                .Select(n => ConvertHelper.ToNotificationDTO(n))
                .ToListAsync();

            return Ok(new NotifsResponse
            {
                Result = true,
                NotificDTOs = postNotifDTOs
            });
        }
    }
}