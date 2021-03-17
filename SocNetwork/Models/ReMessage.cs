using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public enum ReMessageType
    {
        Forward,
        Reply
    }

    [Table("ReMessages")]
    public class ReMessage : Message
    {
        public Guid OriginalMessageId { get; set; }
        public ReMessageType ReMessageType { get; set; }
    }
}
