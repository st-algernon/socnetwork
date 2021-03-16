﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public enum AccountStatus
    {
        IsActive,
        Reported,
        Blocked,
        Deleted
    }

    public class Account
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime RegistrationDate { get; set; }
        public DateTime LastVisited { get; set; }
        public AccountStatus AccountStatus { get; set; }
    }
}