using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Helpers
{
    public class LoadHelper
    {
        private readonly SocNetworkContext db;

        public LoadHelper(SocNetworkContext context)
        {
            db = context;
        }

        public async Task<Post> ForPostAsync(Post post)
        {
            await db.Entry(post).Collection(c => c.Comments).LoadAsync();
            await db.Entry(post).Collection(c => c.PostMedia).LoadAsync();
            await db.Entry(post).Collection(c => c.PostUsers).LoadAsync();
            await db.Entry(post).Collection(c => c.Tags).LoadAsync();

            post.PostUsers.ForEach(async pu =>
            {
                await db.Entry(pu).Reference(c => c.User).LoadAsync();
                pu.User = await ForUserAsync(pu.User);
            });

            post.Comments.ForEach(async c =>
            {
                c = await ForCommentAsync(c);
            });

            return post;
        } 

        public async Task<Comment> ForCommentAsync(Comment comment)
        {
            await db.Entry(comment).Reference(c => c.Post).LoadAsync();
            await db.Entry(comment).Collection(c => c.CommentMedia).LoadAsync();
            await db.Entry(comment).Collection(c => c.CommentUsers).LoadAsync();

            comment.CommentUsers.ForEach(async cu =>
            {
                await db.Entry(cu).Reference(c => c.User).LoadAsync();
                cu.User = await ForUserAsync(cu.User);
            });

            return comment;
        }

        public async Task<User> ForUserAsync(User user)
        {
            await db.Entry(user).Collection(c => c.ProfileMedia).LoadAsync();

            return user;
        }
    }
}
