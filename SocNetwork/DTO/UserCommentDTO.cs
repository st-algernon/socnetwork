using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO
{
    public class UserCommentDTO
    {
        public ShortProfileDTO UserDTO { get; set; }
        public bool IsLiked { get; set; }
        public bool IsAuthor { get; set; }
    }
}
