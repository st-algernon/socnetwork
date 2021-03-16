using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public enum MessageStatus {
        Edited,
        Deleted
    }

    public class Message
    {
        public int Id { get; set; }
        public int AuthorId { get; set; }
        public User User { get; set; }
        public int ConversationId { get; set; }
        public Conversation Conversation { get; set; }
        public string Text { get; set; }
        public DateTime SentAt { get; set; }
        public int ReplyTo { get; set; }
        public List<AttachedFile> AttachedFiles { get; set; }
        public MessageStatus MessageStatus { get; set; }
    }
}
