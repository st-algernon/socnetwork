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
            var mediaForStr = Request.Headers["Media-For"][0];
            var mediaFor = (MediaFor) Enum.Parse(typeof(MediaFor), mediaForStr);
            var file = formCollection.Files[0];
            var mediaHelper = new MediaHelper(db);
            var pathToFile = mediaHelper.SaveFile(file);

            mediaHelper.ResetCurrentImage(currentUser, mediaFor);

            db.ProfileMedia.Add(new ProfileMedia()
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
    }
}
