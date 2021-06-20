using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO
{
    public class TagDTO
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public int Amount { get; set; }
    }
}
