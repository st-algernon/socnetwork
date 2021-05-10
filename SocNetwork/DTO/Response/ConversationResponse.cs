using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Response
{
    public class ConversationResponse
    {
        public bool Result { get; set; }
        public Conversation Conversation { get; set; }
        public List<string> Errors { get; set; }
    }
}
