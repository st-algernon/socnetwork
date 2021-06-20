using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Response
{
    public class CommentsResponse
    {
        public bool Result { get; set; }
        public List<CommentDTO> Comments { get; set; }
        public List<string> Errors { get; set; }
    }
}
