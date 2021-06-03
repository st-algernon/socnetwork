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
        public string Text { get; set; }
        public DateTime DatePublished { get; set; }
        public List<TagDTO> TagDTOs { get; set; }
        public PostStatus PostStatus { get; set; }
    }
}
