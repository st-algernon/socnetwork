using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Response
{
    public class UserMediaResponse
    {
        public bool Result { get; set; }
        public List<UserMediaDTO> Media { get; set; }
        public List<string> Errors { get; set; }
    }
}
