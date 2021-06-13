using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO
{
    public class RelationshipDTO
    {
        public UserDTO FromUserDTO { get; set; }
        public UserDTO ToUserDTO { get; set; }
        public UserRelationshipType UserRelationshipType { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
