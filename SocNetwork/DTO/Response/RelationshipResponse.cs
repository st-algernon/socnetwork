using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Response
{
    public class RelationshipResponse
    {
        public bool Result { get; set; }
        public RelationshipDTO Relationship { get; set; }
        public List<string> Errors { get; set; }
    }
}
