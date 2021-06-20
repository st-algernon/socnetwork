using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Response
{
    public class ShortProfilesResponse
    {
        public bool Result { get; set; }
        public List<ShortProfileDTO> ShortProfiles { get; set; }
        public List<string> Errors { get; set; }
    }
}
