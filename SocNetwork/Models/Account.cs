using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public DateTime CreationDate { get; set; }
        public DateTime LastVisited { get; set; }
        public AccountStatus AccountStatus { get; set; }
        public AccountType AccountType { get; set; }
    }
}
