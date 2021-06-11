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
    public class PostsHub : Hub
    {
        private readonly SocNetworkContext db;

        public PostsHub(SocNetworkContext context)
        {
            db = context;
        }

        public async void Publish(PostRequest request)
        {
            var caller = Context.User.Identity.Name;

            if (caller == request.AuthorId)
            {
                var tags = TagHelper.FindTags(request.Text);

                var post = new Post()
                {
                    UserId = Guid.Parse(request.UserId),
                    Text = request.Text,
                    Tags = tags,

                    DatePublished = DateTime.Now
                };

                await db.Posts.AddAsync(post);

                var userPost = new UserPost()
                {
                    PostId = post.Id,
                    UserId = Guid.Parse(request.AuthorId),
                    IsAuthor = true
                };

                await db.UserPost.AddAsync(userPost);

                foreach (var mediaDTO in request.MediaDTOs)
                {
                    await db.PostMedia.AddAsync(new PostMedia
                    {
                        PostId = post.Id,
                        Path = mediaDTO.Path,
                        MimeType = mediaDTO.MimeType,
                        Size = mediaDTO.Size,
                        CreationDate = mediaDTO.CreationDate
                    });
                }

                await db.SaveChangesAsync();

                var postDTO = ConvertHelper.ToPostDTO(post);

                await Clients.Users(caller).SendAsync("Receive", postDTO);
            }
        }
    }
}
