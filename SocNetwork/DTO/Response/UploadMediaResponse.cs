using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Response
{
    public class UploadMediaResponse
    {
        public bool Result { get; set; }
        public List<Guid> MediaIds { get; set; }
        public List<string> Errors { get; set; }
    }
}
