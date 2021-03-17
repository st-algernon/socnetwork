using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public enum MediaFor
    {
        Avatar,
        Cover
    }

    [Table("ProfileMedia")]
    public class ProfileMedia : Media
    {
        public Guid ProfileId { get; set; }
        public User Profile { get; set; }
        public MediaFor MediaFor { get; set; }
        public bool IsCurrent { get; set; }
    }
}
