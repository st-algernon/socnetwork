using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Request
{
    public class UserNotifRequest
    {
        public string RecipientId { get; set; }
        public string NotifType { get; set; }
    }
}
