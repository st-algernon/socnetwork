using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SocNetwork.Models
{
    public enum Gender
    {
        Unspecified,
        Male,
        Female,
        NonBinary,
        Transgender,
        Intersex
    }

    public enum MaritalStatus
    {
        Unspecified,
        Engaged,
        InARelationship,
        InSingle,
        ItsComplicated,
        Married
    }

    [Table("Users")]
    [Index("Username", IsUnique = true)]
    public class User : Account
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Username { get; set; }
        public string Bio { get; set; }
        public DateTime BirthDate { get; set; }
        public string Location { get; set; }
        public Gender Gender { get; set; }
        public MaritalStatus MaritalStatus { get; set; }
        public List<Chat> Chats { get; set; }
        public List<UserPost> UserPosts { get; set; }
        public List<UserComment> UserComments { get; set; }
        public List<ProfileMedia> ProfileMedia { get; set; }

        public User()
        {
            Chats = new List<Chat>();
            UserPosts = new List<UserPost>();
            UserComments = new List<UserComment>();
            ProfileMedia = new List<ProfileMedia>();
        }
    }
}
