using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO
{
    public class ChatDTO
    {
        public Guid Id { get; set; }
        public List<MessageDTO> MessagesDTO { get; set; }
        public DateTime CreationDate { get; set; }
        public List<ProfileDTO> MembersDTO { get; set; }
        public bool IsDeleted { get; set; }
    }
}
