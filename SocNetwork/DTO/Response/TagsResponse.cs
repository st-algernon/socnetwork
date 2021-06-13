using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Response
{
    public class TagsResponse
    {
        public bool Result { get; set; }
        public List<TagDTO> Tags { get; set; }
        public List<string> Errors { get; set; }
    }
}
