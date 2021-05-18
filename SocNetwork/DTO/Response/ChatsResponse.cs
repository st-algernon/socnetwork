using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Response
{
    public class ChatsResponse
    {
        public bool Result { get; set; }
        public List<ChatDTO> Chats { get; set; }
        public List<string> Errors { get; set; }
    }
}
