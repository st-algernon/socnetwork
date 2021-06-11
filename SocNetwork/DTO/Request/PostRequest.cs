using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Request
{
    public class PostRequest
    {
        public string UserId { get; set; }
        public string AuthorId { get; set; }
        public string Text { get; set; }
        public List<MediaDTO> MediaDTOs { get; set; }
    }
}
