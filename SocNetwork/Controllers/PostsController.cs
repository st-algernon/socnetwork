using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocNetwork.DTO;
using SocNetwork.DTO.Request;
using SocNetwork.DTO.Response;
using SocNetwork.Helpers;
using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;


namespace SocNetwork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly SocNetworkContext db;

        public PostsController(SocNetworkContext context)
        {
            db = context;
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<PostsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost("save")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> SavePost([FromBody] PostRequest request)
        {
            var currentUser = HttpContext.Items["User"] as User;

            if (currentUser.Id != Guid.Parse(request.AuthorId))
            {
                return BadRequest(new PostsResponse
                {
                    Result = true,
                    Errors = new List<string> { "The user has no authority" }
                });
            }

            var tags = TagHelper.FindTags(request.Text);

            var post = new Post()
            {
                UserId = Guid.Parse(request.UserId),
                Text = request.Text,
                Tags = tags,

                DatePublished = DateTime.Now
            };

            await db.Posts.AddAsync(post);

            var userPost = new UserPost()
            {
                PostId = post.Id,
                UserId = Guid.Parse(request.AuthorId),
                IsAuthor = true
            };

            await db.UserPost.AddAsync(userPost);

            foreach (var mediaDTO in request.MediaDTOs)
            {
                await db.PostMedia.AddAsync(new PostMedia
                {
                    PostId = post.Id,
                    Path = mediaDTO.Path,
                    MimeType = mediaDTO.MimeType,
                    Size = mediaDTO.Size,
                    CreationDate = mediaDTO.CreationDate
                });
            }

            await db.SaveChangesAsync();

            var postDTO = ConvertHelper.ToPostDTO(post);

            return Ok(new PostsResponse
            {
                Result = true,
                Posts = new List<PostDTO> { postDTO }
            });

        }

            // PUT api/<PostsController>/5
            [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PostsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
