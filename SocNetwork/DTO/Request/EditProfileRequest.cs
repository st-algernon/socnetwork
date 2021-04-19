using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using SocNetwork.Models;

namespace SocNetwork.DTO.Request
{
    public class EditProfileInfoRequest
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Bio { get; set; }
        public string BirthDate { get; set; }
        public string Location { get; set; }
        public string Gender { get; set; }
        public string MaritalStatus { get; set; }
    }
}