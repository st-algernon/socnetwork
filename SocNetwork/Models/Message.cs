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
        IsEdited,
        IsDeleted
    }

    public class Message
    {
        public Guid Id { get; set; }
        public Guid AuthorId { get; set; }
        public User Author { get; set; }
        public Guid ConversationId { get; set; }
        public Conversation Conversation { get; set; }
        public string Text { get; set; }
        public DateTime CreationDate { get; set; }
        public List<MessageMedia> MessageAttachments { get; set; }
        public MessageStatus MessageStatus { get; set; }
        public MessageState MessageState { get; set; }
    }
}
