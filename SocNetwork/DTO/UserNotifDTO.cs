using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO
{
    public class UserNotifDTO
    {
        public ShortProfileDTO SenderDTO { get; set; }
        public UserNotifType NotifType { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
