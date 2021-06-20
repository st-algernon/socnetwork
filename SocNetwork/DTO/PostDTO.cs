using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO
{
    public class PostDTO
    {
        public Guid Id { get; set; }
        public ShortProfileDTO AuthorDTO { get; set; }
        public string Text { get; set; }
        public DateTime CreationDate { get; set; }
        public List<MediaDTO> MediaDTOs { get; set; }
        public List<UserPostDTO> UserPostDTOs { get; set; }
        public PostStatus PostStatus { get; set; }
        public CommentDTO BestCommentDTO { get; set; }
        public int LikesNumber { get; set; }
        public PostDTO ()
        {
            MediaDTOs = new List<MediaDTO>();
            UserPostDTOs = new List<UserPostDTO>();
        }
    }
}
