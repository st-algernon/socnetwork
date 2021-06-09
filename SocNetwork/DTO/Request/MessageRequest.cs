using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Request
{
    public class MessageRequest
    {
        public string AuthorId { get; set; }
        public string ChatId { get; set; } 
        public string Text { get; set; }
        public List<string> MediaIds { get; set; }
    }
}
