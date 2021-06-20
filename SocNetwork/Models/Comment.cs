using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public enum CommentStatus
    {
        IsInitial,
        IsEdited,
        IsReported,
        IsDeleted
    }

    public class Comment
    {
        public Guid Id { get; set; }
        public Guid PostId { get; set; }
        public Post Post { get; set; }
        public string Text { get; set; }
        public DateTime CreationDate { get; set; }
        public List<UserComment> CommentUsers { get; set; }
        public List<CommentMedia> CommentMedia { get; set; }
        public CommentStatus CommentStatus { get; set; }
        public Comment()
        {
            CommentUsers = new List<UserComment>();
            CommentMedia = new List<CommentMedia>();
        }
    }
}
