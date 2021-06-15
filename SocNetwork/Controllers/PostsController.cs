using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocNetwork.DTO;
using SocNetwork.DTO.Request;
using SocNetwork.DTO.Response;
using SocNetwork.Helpers;
using SocNetwork.Models;
using SocNetwork.Pagination;
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
        private const int EXPIRATION_DAYS = 7;

        public PostsController(SocNetworkContext context)
        {
            db = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostById(string id)
        {
            var post = await db.Posts
                .Include(p => p.PostMedia)
                .Include(p => p.PostUsers)
                .FirstOrDefaultAsync(u => u.Id == Guid.Parse(id));

            if (post == null)
            {
                return BadRequest(new ProfileResponse()
                {
                    Result = false,
                    Errors = new List<string>() { "Post not found" }
                });
            }

            var postDTO = ConvertHelper.ToPostDTO(post);

            return Ok(new PostsResponse()
            {
                Result = true,
                Posts = new List<PostDTO> { postDTO }
            });
        }

        [HttpGet("user/{username}")]
        public async Task<IActionResult> GetPosts(string username, [FromQuery] PostsPageParams postsPageParams)
        {
            var user = await db.Users
                .Include(u => u.ProfileMedia)
                .FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                return BadRequest(new ShortProfilesResponse()
                {
                    Result = false,
                    Errors = new List<string> { "Users doesn't exist" }
                });
            }

            //var user2 = await db.Users
            //    .SelectMany(u => u.UserPosts)
            //    .Where(up => up.User.Username == username && up.IsAuthor)
                
            //    .Select(up => up.Post)
            //    .OrderByDescending(p => p.CreationDate)
            //    .Skip((postsPageParams.Number - 1) * postsPageParams.Size)
            //    .Take(postsPageParams.Size)
            //    .ToListAsync();

            var posts = await db.UserPost
                .Where(up => up.User == user && up.IsAuthor)
                .Select(up => up.Post)
                .OrderByDescending(p => p.CreationDate)
                .Skip((postsPageParams.Number - 1) * postsPageParams.Size)
                .Take(postsPageParams.Size)
                .ToListAsync();

            var posts2 = await db.UserPost
                .Where(up => up.User == user && up.IsAuthor)
                .Select(up => up.Post)
                .Include(p => p.PostUsers)
                .OrderByDescending(p => p.CreationDate)
                .Skip((postsPageParams.Number - 1) * postsPageParams.Size)
                .Take(postsPageParams.Size)
                .ToListAsync();

            var postDTOs = new List<PostDTO>();

            posts.ForEach(p => {
                postDTOs.Add(ConvertHelper.ToPostDTO(p));
            });

            return Ok(new PostsResponse
            {
                Result = true,
                Posts = postDTOs
            });
        }

        [HttpPost]
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

            var tagHelper = new TagHelper(db);
            var tags = await tagHelper.RecognizeTagsAsync(request.Text);

            var postMedia = new List<PostMedia>();

            foreach (var mediaDTO in request.MediaDTOs)
            {
                postMedia.Add(new PostMedia
                {
                    Path = mediaDTO.Path,
                    MimeType = mediaDTO.MimeType,
                    Size = mediaDTO.Size,
                    CreationDate = mediaDTO.CreationDate
                });
            }

            var userPost = new UserPost()
            {
                UserId = Guid.Parse(request.AuthorId),
                IsAuthor = true
            };
            var postUsers = new List<UserPost> { userPost };

            var post = new Post()
            {
                Text = request.Text,
                CreationDate = DateTime.Now,
                PostUsers = postUsers,
                PostMedia = postMedia,
                Tags = tags
            };

            await db.Posts.AddAsync(post);
            await db.SaveChangesAsync();

            var postDTO = ConvertHelper.ToPostDTO(post);

            return Ok(new PostsResponse
            {
                Result = true,
                Posts = new List<PostDTO> { postDTO }
            });

        }

        [HttpGet("feed")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetPostsForFeed([FromQuery] PostsPageParams postsPageParams)
        {
            var currentUser = HttpContext.Items["User"] as User;

            var feed = await db.UserRelationships
                .Where(ur => ur.FromUserId == currentUser.Id && ur.UserRelationshipType == UserRelationshipType.Followed)
                .Select(ur => ur.ToUser)
                .SelectMany(u => u.UserPosts)
                .Where(up => up.IsAuthor)
                .Select(up => up.Post)
                .ToListAsync();

            var partOfFeedDTO = feed
                .OrderByDescending(p => p.CreationDate)
                .Skip((postsPageParams.Number - 1) * postsPageParams.Size)
                .Take(postsPageParams.Size)
                .Select(p => ConvertHelper.ToPostDTO(p))
                .ToList();

            return Ok(new PostsResponse
            {
                Result = true,
                Posts = partOfFeedDTO
            });
        }

        [HttpGet("explore")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetPostsForExplore([FromQuery] PostsPageParams postsPageParams)
        {
            var currentUser = HttpContext.Items["User"] as User;

            var followingsPosts = await db.UserRelationships
                .Where(ur => ur.FromUserId == currentUser.Id && ur.UserRelationshipType == UserRelationshipType.Followed)
                .Select(ur => ur.ToUser)
                .SelectMany(u => u.UserPosts)
                .Where(up => up.IsAuthor)
                .Select(up => up.Post)
                .ToListAsync();

            var recentPosts = await db.Posts
                .Where(p => p.CreationDate.AddDays(EXPIRATION_DAYS) > DateTime.UtcNow)
                .Include(p => p.PostUsers)
                .ToListAsync();

            var explorePostDTOs = recentPosts
                .Except(followingsPosts)
                .Select(p => ConvertHelper.ToPostDTO(p))
                .ToList();

            var partOfExplorePostDTOs = explorePostDTOs
                .OrderByDescending(p => p.LikesNumber)
                .Skip((postsPageParams.Number - 1) * postsPageParams.Size)
                .Take(postsPageParams.Size)
                .ToList();

            return Ok(new PostsResponse
            {
                Result = true,
                Posts = partOfExplorePostDTOs
            });
        }
    }
}
