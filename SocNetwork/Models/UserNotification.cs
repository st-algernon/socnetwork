using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public enum UserNotifType
    {
        Followed
    }

    [Table("UserNotifications")]
    public class UserNotification : Notification
    {
        public UserNotifType NotifType { get; set; }
    }
}
