using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO
{
    public class MessageDTO
    {
        public Guid Id { get; set; }
        public ShortProfileDTO AuthorDTO { get; set; }
        public Guid ChatId { get; set; }
        public string Text { get; set; }
        public DateTime CreationDate { get; set; }
        public List<MediaDTO> MessageMediaDTOs { get; set; }
        public MessageStatus MessageStatus { get; set; }
        public MessageState MessageState { get; set; }
        public MessageDTO()
        {
            MessageMediaDTOs = new List<MediaDTO>();
        }
    }
}
