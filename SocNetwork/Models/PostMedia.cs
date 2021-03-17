using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    [Table("PostMedia")]
    public class PostMedia : Media
    {
        public Guid PostId { get; set; }
        public Post Post { get; set; }
    }
}
