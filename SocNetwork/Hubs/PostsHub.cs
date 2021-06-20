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

        public async Task LikePost(string postId)
        {
            var callerId = Context.User.Identity.Name;

            var userPost = await db.UserPost
                .Include(up => up.User)
                .FirstOrDefaultAsync(up => 
                    up.UserId == Guid.Parse(callerId) && 
                    up.PostId == Guid.Parse(postId)
                );

            if (userPost == null)
            {
                userPost = new UserPost
                {
                    UserId = Guid.Parse(callerId),
                    PostId = Guid.Parse(postId),
                    IsLiked = true
                };

                await db.UserPost.AddAsync(userPost);
            } else
            {
                userPost.IsLiked = true;
            }

            await db.SaveChangesAsync();

            var userPostDTO = ConvertHelper.ToUserPostDTO(userPost);

            await Clients.All.SendAsync("ReceivePostLikes", userPostDTO);
        }

        public async Task UnlikePost(string postId)
        {
            var callerId = Context.User.Identity.Name;

            var userPost = await db.UserPost
                .Include(up => up.User)
                .FirstOrDefaultAsync(up =>
                    up.UserId == Guid.Parse(callerId) &&
                    up.PostId == Guid.Parse(postId)
                );

            if (userPost == null)
            {
                userPost = new UserPost
                {
                    UserId = Guid.Parse(callerId),
                    PostId = Guid.Parse(postId),
                    IsLiked = false
                };

                await db.UserPost.AddAsync(userPost);
            }
            else
            {
                userPost.IsLiked = false;
            }

            await db.SaveChangesAsync();

            var userPostDTO = ConvertHelper.ToUserPostDTO(userPost);

            await Clients.All.SendAsync("ReceivePostLikes", userPostDTO);
        }

        public async Task LikeComment(string commentId)
        {
            var callerId = Context.User.Identity.Name;
            var userComment = await db.UserComment
                .Include(up => up.User)
                .FirstOrDefaultAsync(uc =>
                   uc.UserId == Guid.Parse(callerId) &&
                   uc.CommentId == Guid.Parse(commentId)
                );

            if (userComment == null)
            {
                userComment = new UserComment
                {
                    UserId = Guid.Parse(callerId),
                    CommentId = Guid.Parse(commentId),
                    IsLiked = true
                };

                await db.UserComment.AddAsync(userComment);
            }
            else
            {
                userComment.IsLiked = true;
            }

            await db.SaveChangesAsync();

            var userCommentDTO = ConvertHelper.ToUserCommentDTO(userComment);

            await Clients.All.SendAsync("ReceiveCommentLikes", userCommentDTO);
        }

        public async Task UnlikeComment(string commentId)
        {
            var callerId = Context.User.Identity.Name;
            var userComment = await db.UserComment
                .Include(up => up.User)
                .FirstOrDefaultAsync(uc =>
                   uc.UserId == Guid.Parse(callerId) &&
                   uc.CommentId == Guid.Parse(commentId)
                );

            if (userComment == null)
            {
                userComment = new UserComment
                {
                    UserId = Guid.Parse(callerId),
                    CommentId = Guid.Parse(commentId),
                    IsLiked = false
                };

                await db.UserComment.AddAsync(userComment);
            }
            else
            {
                userComment.IsLiked = false;
            }

            await db.SaveChangesAsync();

            var userCommentDTO = ConvertHelper.ToUserCommentDTO(userComment);

            await Clients.All.SendAsync("ReceiveCommentLikes", userCommentDTO);
        }
    }
}
