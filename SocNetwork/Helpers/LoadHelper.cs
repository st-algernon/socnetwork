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

        public Post LoadPostDepends(Post post)
        {
            db.Entry(post).Collection(c => c.Comments).Load();
            db.Entry(post).Collection(c => c.PostMedia).Load();
            db.Entry(post).Collection(c => c.PostUsers).Load();
            db.Entry(post).Collection(c => c.Tags).Load();

            post.PostUsers.ForEach(pu =>
            {
                db.Entry(pu).Reference(c => c.User).Load();
                pu.User = LoadUserDepends(pu.User);
            });

            post.Comments.ForEach(c =>
            {
                c = LoadCommentDepends(c);
            });

            return post;
        } 

        public Comment LoadCommentDepends(Comment comment)
        {
            db.Entry(comment).Reference(c => c.Post).Load();
            db.Entry(comment).Collection(c => c.CommentMedia).Load();
            db.Entry(comment).Collection(c => c.CommentUsers).Load();

            comment.CommentUsers.ForEach(cu =>
            {
                db.Entry(cu).Reference(c => c.User).Load();
                cu.User = LoadUserDepends(cu.User);
            });

            return comment;
        }

        public User LoadUserDepends(User user)
        {
            db.Entry(user).Collection(c => c.ProfileMedia).Load();

            return user;
        }
    }
}
