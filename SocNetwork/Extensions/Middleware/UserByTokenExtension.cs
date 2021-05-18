using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SocNetwork.Models;

namespace SocNetwork.Extensions.Middleware
{
   public static class UserByTokenExtension
    {
        public static IApplicationBuilder UseUserDefinition(this IApplicationBuilder builder)
        {
            return builder
                .UseMiddleware<UserByTokenMiddleware>();
        }
    }
    
    public class UserByTokenMiddleware
    {
        private readonly RequestDelegate _next;
 
        public UserByTokenMiddleware(RequestDelegate next)
        {
            _next = next;
        }
 
        public async Task InvokeAsync(HttpContext context, SocNetworkContext db)
        {
            var userId = context.User.Identity.Name;

            if (!string.IsNullOrEmpty(userId))
            {
                var user = await db.Users.FirstOrDefaultAsync(u => u.Id.ToString() == userId);

                context.Items.Add("User", user);
            }

            await _next.Invoke(context);
        }
    }
}