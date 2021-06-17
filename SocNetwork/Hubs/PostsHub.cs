using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
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
    public class PostsHub : Hub
    {
        private readonly SocNetworkContext db;

        public PostsHub(SocNetworkContext context)
        {
            db = context;
        }

        public async void LikePost(string postId)
        {
            var callerId = Context.User.Identity.Name;
            var author = await db.UserPost
                .Where(up => up.PostId == Guid.Parse(postId) && up.IsAuthor)
                .Select(up => up.User)
                .FirstOrDefaultAsync();
            var userPost = new UserPost
            {
                UserId = Guid.Parse(callerId),
                PostId = Guid.Parse(postId),
                IsLiked = true
            };

            await db.UserPost.AddAsync(userPost);
            await db.SaveChangesAsync();

            var userPostDTO = ConvertHelper.ToUserPostDTO(userPost);

            await Clients.Users(author.Id.ToString()).SendAsync("ReceivePostLikes", userPostDTO);
        }
    }
}
