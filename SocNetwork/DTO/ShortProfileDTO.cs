using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO
{
    public class ShortProfileDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public DateTime LastVisited { get; set; }
        public MediaDTO AvatarDTO { get; set; }
    }
}
