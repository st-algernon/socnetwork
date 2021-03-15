using System;
using System.Collections.Generic;
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

    public enum AccountStatus
    {
        IsActive,
        Reported,
        Blocked
    }

    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Bio { get; set; }
        public DateTime BirthDate { get; set; }
        public string Location { get; set; }
        public Gender Gender { get; set; }
        public DateTime RegistrationDate { get; set; }
        public Relationship Relationship { get; set; }
        public DateTime LastVisited { get; set; }
        public AccountStatus AccountStatus { get; set; }
    }
}
