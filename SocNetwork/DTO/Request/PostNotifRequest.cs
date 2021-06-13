using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Request
{
    public class PostNotifRequest
    {
        public string RecipientId { get; set; }
        public string PostId { get; set; }
        public string NotifType { get; set; }
    }
}
