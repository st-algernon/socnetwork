using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    [Table("Reposts")]
    public class Repost : Post
    {
        public Guid OriginalPostId { get; set; }
    }
}
