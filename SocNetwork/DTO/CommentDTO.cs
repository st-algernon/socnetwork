using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO
{
    public class CommentDTO
    {
        public Guid Id { get; set; }
        public Guid PostId { get; set; }
        public ShortProfileDTO AuthorDTO { get; set; }
        public string Text { get; set; }
        public DateTime CreationDate { get; set; }
        public List<MediaDTO> MediaDTOs { get; set; }
        public List<UserCommentDTO> UserCommentDTOs { get; set; }
        public CommentStatus CommentStatus { get; set; }
        public int LikesNumber { get; set; }
        public CommentDTO()
        {
            MediaDTOs = new List<MediaDTO>();
            UserCommentDTOs = new List<UserCommentDTO>();
        }
    }
}
