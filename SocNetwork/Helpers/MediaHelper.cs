using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SocNetwork.DTO;
using SocNetwork.Extensions;
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
        public static string SaveToFileSystem(IFormFile file)
        {
            try
            {
                var folderName = Path.Combine("wwwroot/resources", file.ContentType);
                var dbFolderName = Path.Combine("resources", file.ContentType);
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
                    var dbPath = Path.Combine(dbFolderName, fullFileName);

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
    }
}
