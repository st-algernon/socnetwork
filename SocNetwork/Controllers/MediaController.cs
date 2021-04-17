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

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("profile/{username}")]
        public async Task<IActionResult> Get(string username)
        {
            var user = await db.Users
                .Include(u => u.ProfileMedia)
                .FirstOrDefaultAsync(u => u.Username == username);

            if (user == null) {
                return BadRequest(new UserMediaResponse()
                {
                    Result = false,
                    Errors = new List<string>() { "User not found" }
                });
            }

            var media = user.ProfileMedia.ToList();

            var mediaDTO = new List<UserMediaDTO>();

            media.ForEach(m =>
            {
                var mDTO = new UserMediaDTO();
                m.CopyPropertiesTo<ProfileMedia, UserMediaDTO>(mDTO);
                mediaDTO.Add(mDTO);
            });

            return Ok(new UserMediaResponse
            {
                Result = true,
                Media = mediaDTO
            });
        }

        [Authorize(Roles = "User")]
        [HttpPost("profile"), DisableRequestSizeLimit]
        public async Task<IActionResult> ProfileMedia()
        {
            var currentUser = HttpContext.Items["User"] as User;

            var formCollection = await Request.ReadFormAsync();
            var mediaForStr = Request.Headers["Media-For"][0];
            var mediaFor = (MediaFor) Enum.Parse(typeof(MediaFor), mediaForStr);
            var file = formCollection.Files[0];
            var pathToFile = SaveFile(file);

            ResetCurrentImage(currentUser, mediaFor);

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

        // PUT api/<MediaController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<MediaController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        private string SaveFile(IFormFile file)
        {
            try
            {
                var folderName = Path.Combine("Resources", file.ContentType);
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (!Directory.Exists(pathToSave))
                {
                    Directory.CreateDirectory(pathToSave);
                }

                if (file.Length > 0)
                {
                    var name = Guid.NewGuid().ToString();
                    var format = file.ContentType[(file.ContentType.IndexOf('/') + 1)..];
                    var fullFileName = name + '.' + format;

                    var fullPath = Path.Combine(pathToSave, fullFileName);
                    var dbPath = Path.Combine(folderName, fullFileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return dbPath;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        private void ResetCurrentImage(User user, MediaFor resetFor)
        {
            var media = db.ProfileMedia.Where(
                        m => m.ProfileId == user.Id
                          && m.MediaFor == resetFor)
                        ?.ToList();

            var medialist = media.ToList();

            foreach (var m in media)
            {
                m.IsCurrent = false;
            }

            db.SaveChanges();
        }
    }
}
