﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public List<Post> Posts { get; set; }
    }
}
