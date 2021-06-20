using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO
{
    public class ChatDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public MediaDTO CoverDTO { get; set; }
        public List<MessageDTO> MessageDTOs { get; set; }
        public DateTime CreationDate { get; set; }
        public List<ShortProfileDTO> MemberDTOs { get; set; }
    }
}
