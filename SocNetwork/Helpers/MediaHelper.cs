using Microsoft.AspNetCore.Http;
using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Helpers
{
    public class MediaHelper
    {
        private readonly SocNetworkContext db;
        public MediaHelper(SocNetworkContext context)
        {
            db = context;
        }

        public string SaveFile(IFormFile file)
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
            catch (Exception)
            {
                return null;
            }
        }

        public void ResetCurrentImage(User user, MediaFor resetFor)
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
