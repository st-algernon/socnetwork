using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    [Table("MessageMedia")]
    public class MessageMedia : Media
    {
        public Guid MessageId { get; set; }
        public Message Message { get; set; }
    }
}
