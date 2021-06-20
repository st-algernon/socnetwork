using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Request
{
    public class NotificRequest
    {
        public string RecipientId { get; set; }
        public string SubjectId { get; set; }
        public int SubjectType { get; set; }
        public int NotificType { get; set; }
    }
}
