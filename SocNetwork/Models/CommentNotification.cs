using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public enum CommentNotifType
    {
        Liked,
        Replied
    }

    [Table("CommentNotifications")]
    public class CommentNotification : Notification
    {
        public Guid CommentId { get; set; }
        public Comment Comment { get; set; }
        public CommentNotifType NotifType { get; set; }
    }
}
