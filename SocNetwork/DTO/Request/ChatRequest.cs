using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Request
{
    public class ChatRequest
    {
        public string Id { get; set; }
        public string[] MembersId { get; set; }
    }
}
