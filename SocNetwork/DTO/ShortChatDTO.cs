using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO
{
    public class ShortChatDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public MediaDTO CoverDTO { get; set; }
        public MessageDTO LastMessageDTO { get; set; }
    }
}
