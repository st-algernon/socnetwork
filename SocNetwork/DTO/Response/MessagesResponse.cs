using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Response
{
    public class MessagesResponse
    {
        public bool Result { get; set; }
        public List<MessageDTO> Messages { get; set; }
        public List<string> Errors { get; set; }
    }
}
