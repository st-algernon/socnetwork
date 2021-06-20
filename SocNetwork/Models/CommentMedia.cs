using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    [Table("CommentMedia")]
    public class CommentMedia : Media
    {
        public Guid CommentId { get; set; }
        public Comment Comment { get; set; }
    }
}
