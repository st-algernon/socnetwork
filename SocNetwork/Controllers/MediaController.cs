using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocNetwork.Models;
using SocNetwork.Helpers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Net.Mime;
using Microsoft.AspNetCore.Authorization;
using SocNetwork.DTO.Response;
using Microsoft.EntityFrameworkCore;
using SocNetwork.Extensions;
using SocNetwork.DTO;

namespace SocNetwork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly SocNetworkContext db;

        public MediaController(SocNetworkContext context)
        {
            db = context;
        }

        [Authorize(Roles = "User")]
        [HttpPost("profile"), DisableRequestSizeLimit]
        public async Task<IActionResult> UploadProfileMedia()
        {
            var currentUser = HttpContext.Items["User"] as User;

            var formCollection = await Request.ReadFormAsync();
            var file = formCollection.Files[0];
            var pathToFile = MediaHelper.SaveToFileSystem(file);
            var mediaForStr = Request.Headers["Media-For"][0];
            var mediaFor = (MediaFor)Enum.Parse(typeof(MediaFor), mediaForStr);

            UsersHelper.ResetCurrentProfileMedia(currentUser, mediaFor);

            await db.ProfileMedia.AddAsync(new ProfileMedia()
            {
                ProfileId = currentUser.Id,
                Path = pathToFile,
                Size = (int)file.Length,
                MimeType = file.ContentType,
                CreationDate = DateTime.Now,
                MediaFor = mediaFor,
                IsCurrent = true
            });

            await db.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Roles = "User")]
        [HttpPost("message"), DisableRequestSizeLimit]
        public async Task<IActionResult> UploadMessageMedia()
        {
            var formCollection = await Request.ReadFormAsync();
            var files = formCollection.Files;
            var mediaDTOs = new List<MediaDTO>();

            foreach(var file in files)
            {
                var pathToFile = MediaHelper.SaveToFileSystem(file);

                var mediaDTO = new MediaDTO()
                {
                    Path = pathToFile,
                    Size = (int)file.Length,
                    MimeType = file.ContentType,
                    CreationDate = DateTime.Now
                };

                mediaDTOs.Add(mediaDTO);
            }

            return Ok(new UploadMediaResponse()
            {
                Result = true,
                MediaDTOs = mediaDTOs
            });
        }

        [HttpGet("{username}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetUserMedia(string username)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                return BadRequest(new MediaResponse()
                {
                    Result = false,
                    Errors = new List<string>() { "User not found" }
                });
            }

            var avatars = await db.ProfileMedia
                .Where(pm => pm.Profile.Username == username && pm.MediaFor == MediaFor.Avatar)
                .ToListAsync();

            var avatarDTOs = new List<MediaDTO>();

            avatars.ForEach(m =>
            {
                avatarDTOs.Add(ConvertHelper.ToMediaDTO(m));
            });

            return Ok(new MediaResponse
            {
                Result = true,
                Media = avatarDTOs
            });
        }
    }
}
