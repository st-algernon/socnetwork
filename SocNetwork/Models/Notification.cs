using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public enum NotifType
    {
        Followed,
        LikedPost,
        RePost,
        CommentedPost
    }

    public class Notification
    {
        public Guid Id { get; set; }
        public Guid SenderId { get; set; }
        public User Sender { get; set; }
        public Guid RecipientId { get; set; }
        public User Recipient { get; set; }
        public NotifType NotifType { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
