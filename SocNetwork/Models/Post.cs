﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public class Post
    {
        public int Id { get; set; }
        public int AuthorId { get; set; }
        public User User { get; set; }
        public string Text { get; set; }
        public DateTime DatePublished { get; set; }
        public List<AttachedFile> AttachedFiles { get; set; }
        public List<Tag> Tags { get; set; }
        public List<Comment> Comments { get; set; }
        public bool IsEdited { get; set; }
    }
}
