using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO
{
    public class NotificationDTO
    {
        public Guid Id { get; set; }
        public ShortProfileDTO SenderDTO { get; set; }
        public Guid SubjectId { get; set; }
        public SubjectType SubjectType { get; set; }
        public NotificType NotificType { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
