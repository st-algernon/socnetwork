using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Helpers
{
    public class PostHelper
    {
        private readonly SocNetworkContext db;

        public PostHelper(SocNetworkContext context)
        {
            db = context;
        }

        public static Comment GetBestComment(Post post)
        {
            var comments = post.Comments;

            var maxCount = 0;
            var bestComment = new Comment();

            foreach (var comment in comments)
            {
                var count = comment.CommentUsers.Where(cu => cu.IsLiked).Count();

                if (maxCount < count)
                {
                    maxCount = count;
                    bestComment = comment;
                }
            }

            return bestComment;
        }
    }
}
