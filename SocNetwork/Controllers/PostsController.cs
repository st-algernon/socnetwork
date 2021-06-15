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
                .Include(u => u.UserPosts)
                .FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                return BadRequest(new ShortProfilesResponse()
                {
                    Result = false,
                    Errors = new List<string> { "User doesn't exist" }
                });
            }

            var posts = await db.UserPost
                .Where(up => up.User == user && up.IsAuthor)
                .Select(up => up.Post)
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

            var postUsers = new List<UserPost>
            {
                new UserPost()
                {
                    User = currentUser,
                    IsAuthor = true
                }
            };

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

            var feed2 = await db.UserRelationships
                .Where(ur => ur.FromUser == currentUser && ur.UserRelationshipType == UserRelationshipType.Followed)
                .Select(ur => ur.ToUser)
                .SelectMany(u => u.UserPosts)
                .Where(up => up.IsAuthor)
                .Include(up => up.Post)
                .Include(up => up.User)
                .ToListAsync();

            var feed3 = await db.UserRelationships
                .Include(ur => ur.ToUser)
                .ThenInclude(u => u.UserPosts)
                .Where(ur => ur.FromUser == currentUser && ur.UserRelationshipType == UserRelationshipType.Followed)
                .Select(ur => ur.ToUser)
                .SelectMany(u => u.UserPosts)
                .Where(up => up.IsAuthor)
                .Include(up => up.Post)
                .ToListAsync();

            var feed = feed2.Select(up => up.Post).ToList();

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

        [HttpGet("tag/{content}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetPostsByTag(string content)
        {
            //var postDTOs = await db.Tags
            //   .Include(t => t.Posts)
            //   .ThenInclude(p => p.PostUsers)
            //   .Where(t => t.Content == content)
            //   .SelectMany(t => t.Posts)
            //   .Select(p => ConvertHelper.ToPostDTO(p))
            //   .ToListAsync();

            var p = await db.UserPost
                .Include(up => up.User)
                .Select(u => u.Post)
                .SelectMany(p => p.Tags)
                .Where(t => t.Content == content)
                .Include(t => t.Posts)
                .ToListAsync();

            var postDTOs = p
                .SelectMany(t => t.Posts)
                .Select(p => ConvertHelper.ToPostDTO(p))
                .ToList();

            return Ok(new PostsResponse
            {
                Result = true,
                Posts = postDTOs
            });
        }

        [HttpPost("comment")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> AddCommentToPost([FromBody] CommentRequest request)
        {
            var currentUser = HttpContext.Items["User"] as User;

            var tagHelper = new TagHelper(db);
            var tags = await tagHelper.RecognizeTagsAsync(request.Text);

            var commentMedia = new List<CommentMedia>();

            foreach (var mediaDTO in request.MediaDTOs)
            {
                commentMedia.Add(new CommentMedia
                {
                    Path = mediaDTO.Path,
                    MimeType = mediaDTO.MimeType,
                    Size = mediaDTO.Size,
                    CreationDate = mediaDTO.CreationDate
                });
            }

            var userComments = new List<UserComment>
            {
                new UserComment()
                {
                    User = currentUser,
                    IsAuthor = true
                }
            };

            var comment = new Comment()
            {
                Text = request.Text,
                CreationDate = DateTime.UtcNow,
                CommentUsers = userComments,
                CommentMedia = commentMedia,
                Tags = tags
            };

            await db.Comments.AddAsync(comment);
            await db.SaveChangesAsync();

            var commentDTO = ConvertHelper.ToCommentDTO(comment);

            return Ok(new CommentsResponse
            {
                Result = true,
                Comments = new List<CommentDTO>() { commentDTO }
            });
        }

        [HttpGet("{id}/comments")]
        public async Task<IActionResult> GetComments(string id, [FromQuery] PostsPageParams postsPageParams)
        {
            var post = await db.Posts.FirstOrDefaultAsync(p => p.Id == Guid.Parse(id));

            if (post == null)
            {
                return BadRequest(new ShortProfilesResponse()
                {
                    Result = false,
                    Errors = new List<string> { "Post doesn't exist" }
                });
            }

            var commentDTOs = await db.Posts
                .Where(p => p.Id == Guid.Parse(id))
                .SelectMany(p => p.Comments)
                .OrderByDescending(p => p.CreationDate)
                .Skip((postsPageParams.Number - 1) * postsPageParams.Size)
                .Take(postsPageParams.Size)
                .Select(c => ConvertHelper.ToCommentDTO(c))
                .ToListAsync();

            return Ok(new CommentsResponse
            {
                Result = true,
                Comments = commentDTOs
            });
        }
    }
}
