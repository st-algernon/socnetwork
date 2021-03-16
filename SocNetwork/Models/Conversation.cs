using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public class Conversation
    {
        public int Id { get; set; }
        public List<Message> Messages { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<User> Members { get; set; }
        public bool IsDeleted { get; set; }
    }
}
