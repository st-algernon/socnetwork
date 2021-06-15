using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO
{
    public class CommentNotifDTO
    {
        public ShortProfileDTO SenderDTO { get; set; }
        public Guid CommentId { get; set; }
        public CommentNotifDTO NotifType { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
