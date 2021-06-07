using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Response
{
    public class ShortProfileResponse
    {
        public bool Result { get; set; }
        public ShortProfileDTO ShortProfile { get; set; }
        public List<string> Errors { get; set; }
    }
}
