using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public class UserComment
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid CommentId { get; set; }
        public Comment Comment { get; set; }
        public bool IsLiked { get; set; }
        public bool IsAuthor { get; set; }
    }
}
