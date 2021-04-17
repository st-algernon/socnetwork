using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO
{
    public class UserMediaDTO
    {
        public Guid Id { get; set; }
        public string MimeType { get; set; }
        public string Path { get; set; }
        public int Size { get; set; }
        public DateTime CreationDate { get; set; }
        public MediaFor MediaFor { get; set; }
        public bool IsCurrent { get; set; }
    }
}
