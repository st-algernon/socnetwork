using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public enum SubjectType
    {
        None,
        Post,
        Comment
    }

    public enum NotificType
    {
        Followed,
        Liked,
        Reposted,
        Commented
    }

    public class Notification
    {
        public Guid Id { get; set; }
        public Guid SenderId { get; set; }
        public User Sender { get; set; }
        public Guid RecipientId { get; set; }
        public User Recipient { get; set; }
        public Guid SubjectId { get; set; }
        public SubjectType SubjectType { get; set; }
        public NotificType NotificType { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
