using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO
{
    public class MediaDTO
    {
        public Guid Id { get; set; }
        public string MimeType { get; set; }
        public string Path { get; set; }
        public int Size { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
