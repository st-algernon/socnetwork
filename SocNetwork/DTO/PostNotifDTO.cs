using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO
{
    public class PostNotifDTO
    {
        public ShortProfileDTO SenderDTO { get; set; }
        public Guid PostId { get; set; }
        public PostNotifType NotifType { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
