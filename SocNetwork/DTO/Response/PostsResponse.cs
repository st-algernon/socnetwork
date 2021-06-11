using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Response
{
    public class PostsResponse
    {
        public bool Result { get; set; }
        public List<PostDTO> Posts { get; set; }
        public List<string> Errors { get; set; }
    }
}
