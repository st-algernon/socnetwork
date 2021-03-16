using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public enum Gender
    {
        Male,
        Female,
        NonBinary,
        Transgender,
        Intersex,
        Unspecified
    }

    public enum Relationship
    {
        Engaged,
        InARelationship,
        InSingle,
        ItsComplicated,
        Married,
        Unspecified
    }

    [Table("Users")]
    public class User : Account
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public string Bio { get; set; }
        public DateTime BirthDate { get; set; }
        public string Location { get; set; }
        public Gender Gender { get; set; }
        public Relationship Relationship { get; set; }
        public string AvatarPath { get; set; }
        public string CoverPath { get; set; }
        public List<Post> Posts { get; set; }
        public List<Conversation> Conversations { get; set; }
    }
}
