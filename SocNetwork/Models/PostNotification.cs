using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public enum PostNotifType
    {
        Liked,
        Repost,
        Commented
    }

    [Table("PostNotifications")]
    public class PostNotification : Notification
    {
        public Guid PostId { get; set; }
        public Post Post { get; set; }
        public PostNotifType NotifType { get; set; }
    }
}
