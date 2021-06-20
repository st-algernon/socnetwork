using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public enum PostStatus
    {
        IsInitial,
        IsEdited,
        IsReported,
        IsDeleted
    }

    public class Post
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public DateTime CreationDate { get; set; }
        public List<Tag> Tags { get; set; }
        public List<UserPost> PostUsers { get; set; }
        public List<PostMedia> PostMedia { get; set; }
        public PostStatus PostStatus { get; set; }
        public List<Comment> Comments { get; set; }
        public Post()
        {
            Tags = new List<Tag>();
            PostUsers = new List<UserPost>();
            PostMedia = new List<PostMedia>();
            Comments = new List<Comment>();
        }
    }
}
