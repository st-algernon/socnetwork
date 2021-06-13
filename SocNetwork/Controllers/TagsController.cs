using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocNetwork.DTO;
using SocNetwork.DTO.Response;
using SocNetwork.Helpers;
using SocNetwork.Models;
using SocNetwork.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly SocNetworkContext db;
        private const int EXPIRATION_DAYS = 7;

        public TagsController(SocNetworkContext context)
        {
            db = context;
        }
        
        [Authorize(Roles = "User")]
        [HttpGet("{content}")]
        public async Task<IActionResult> Get(string content)
        {
            var hashtags = await db.Tags.Where(t => t.Content == content).ToListAsync();
            var posts = new List<Post>();

            hashtags.ForEach(h =>
            {
                posts.AddRange(h.Posts);
            });

            var postDTOs = new List<PostDTO>();

            posts.ForEach(p =>
            {
                postDTOs.Add(ConvertHelper.ToPostDTO(p));
            });

            return Ok(new PostsResponse
            {
                Result = true,
                Posts = postDTOs
            });
        }

        [HttpGet("trends")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Get([FromQuery] TagsPageParams tagsPageParams)
        {
            var allTags = await db.Tags.ToListAsync();
            var tagDTOs = new List<TagDTO>();

            allTags.ForEach(t =>
            {
                tagDTOs.Add(new TagDTO
                {
                    Id = t.Id,
                    Content = t.Content,
                    Amount = t.Posts.Where(p => p.CreationDate.AddDays(EXPIRATION_DAYS) > DateTime.UtcNow).Count()
                });
            });

            var topTagDTOs = tagDTOs
                .OrderByDescending(t => t.Amount)
                .Skip((tagsPageParams.Number - 1) * tagsPageParams.Size)
                .Take(tagsPageParams.Size)
                .ToList();

            return Ok(new TagsResponse
            {
                Result = true,
                Tags = topTagDTOs
            });
        }
    }
}
