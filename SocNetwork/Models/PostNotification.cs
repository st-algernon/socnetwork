using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    [Table("PostNotifications")]
    public class PostNotification : Notification
    {
        public Guid PostId { get; set; }
    }
}
