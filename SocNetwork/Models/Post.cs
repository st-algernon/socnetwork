﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Models
{
    public enum PostStatus
    {
        IsEdited,
        IsReported,
        IsDeleted
    }

    public class Post
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public DateTime DatePublished { get; set; }
        public List<Tag> Tags { get; set; }
        public List<UserPost> PostUsers { get; set; }
        public PostStatus PostStatus { get; set; }
    }
}
