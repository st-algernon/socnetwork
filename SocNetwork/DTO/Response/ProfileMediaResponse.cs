using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Response
{
    public class ProfileMediaResponse
    {
        public bool Result { get; set; }
        public List<ProfileMedia> Media { get; set; }
        public List<string> Errors { get; set; }
    }
}
