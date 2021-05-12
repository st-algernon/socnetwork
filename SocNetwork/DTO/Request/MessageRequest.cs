using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Request
{
    public class MessageRequest
    {
        public Guid AuthorId { get; set; }
        public string Text { get; set; }
        public DateTime CreationDate { get; set; }
        public List<MediaDTO> MessageMediaDTO { get; set; }
        public MessageStatus MessageStatus { get; set; }
        public MessageState MessageState { get; set; }
        public MessageRequest()
        {
            MessageMediaDTO = new List<MediaDTO>();
        }
    }
}
