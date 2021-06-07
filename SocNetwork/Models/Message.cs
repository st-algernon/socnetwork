using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public enum MessageState
    {
        IsSent,
        IsRead
    }

    public enum MessageStatus {
        IsInitial,
        IsEdited,
        IsDeleted
    }

    public class Message
    {
        public Guid Id { get; set; }
        public Guid AuthorId { get; set; }
        public User Author { get; set; }
        public Guid ChatId { get; set; }
        public Chat Chat { get; set; }
        public string Text { get; set; }
        public DateTime CreationDate { get; set; }
        public List<MessageMedia> MessageMedia { get; set; }
        public MessageStatus MessageStatus { get; set; }
        public MessageState MessageState { get; set; }
        public Message()
        {
            MessageMedia = new List<MessageMedia>();
        }
    }
}
