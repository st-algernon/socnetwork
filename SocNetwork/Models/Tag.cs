using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public class Tag
    {
        public Guid Id { get; set; }
        [Required]
        public string Content { get; set; }
        public List<Post> Posts { get; set; }
    }
}
