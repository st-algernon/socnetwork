using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Response
{
    public class ShortChatsResponse
    {
        public bool Result { get; set; }
        public List<ShortChatDTO> ShortChats { get; set; }
        public List<string> Errors { get; set; }
    }
}
