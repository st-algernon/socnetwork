using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    [Table("RePosts")]
    public class RePost : Post
    {
        public Guid OriginalPostId { get; set; }
    }
}
