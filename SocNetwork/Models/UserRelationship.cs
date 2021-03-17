using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public enum UserRelationshipType
    {
        Followed,
        UnFollowed,
        Blocked
    }

    public class UserRelationship
    {
        public Guid Id { get; set; }
        public Guid FromUserId { get; set; }
        public User FromUser { get; set; }
        public Guid ToUserId { get; set; }
        public User ToUser { get; set; }
        public UserRelationshipType UserRelationshipType { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
