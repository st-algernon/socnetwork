using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Request
{
    public class CommentRequest
    {
        public string PostId { get; set; }
        public string Text { get; set; }
        public List<MediaDTO> MediaDTOs { get; set; }
    }
}
