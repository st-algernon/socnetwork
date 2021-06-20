using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public class Chat
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public Media Cover { get; set; }
        public List<Message> Messages { get; set; }
        public DateTime CreationDate { get; set; }
        public List<User> Members { get; set; }
        public bool IsDeleted { get; set; }
        public Chat()
        {
            Messages = new List<Message>();
            Members = new List<User>();
        }
    }
}
