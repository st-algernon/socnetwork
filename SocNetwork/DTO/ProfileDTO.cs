using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using SocNetwork.Models;

namespace SocNetwork.DTO
{
    public class ProfileDTO
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Bio { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastVisited { get; set; }
        public AccountStatus AccountStatus { get; set; }
        public DateTime BirthDate { get; set; }
        public string Location { get; set; }
        public Gender Gender { get; set; }
        public MaritalStatus MaritalStatus { get; set; }
        public List<ProfileMediaDTO> MediaDTOs { get; set; }
        public string AvatarPath { get; set; }
        public string CoverPath { get; set; }

        public ProfileDTO()
        {
            MediaDTOs = new List<ProfileMediaDTO>();
        }
    }
}