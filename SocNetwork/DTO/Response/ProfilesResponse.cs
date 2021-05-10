using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Response
{
    public class ProfilesResponse
    {
        public bool Result { get; set; }
        public List<ProfileDTO> Profiles { get; set; }
        public List<string> Errors { get; set; }
    }
}
