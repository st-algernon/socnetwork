using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public enum AccountStatus
    {
        IsActivated,
        IsReported,
        IsDeleted
    }

    public enum AccountType
    {
        User,
        Admin,
        Moderator
    }

    public class Account
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastVisited { get; set; }
        public AccountStatus AccountStatus { get; set; }
        public AccountType AccountType { get; set; }
    }
}
