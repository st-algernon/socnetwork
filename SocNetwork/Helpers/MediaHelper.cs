using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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

        public void Upload(FileInfo file, string connectionString, string container)
        {
            var containerClient = new BlobContainerClient(connectionString, container);

            try
            {
                var blobClient = containerClient.GetBlobClient(file.Name);
                using (var fileStream = File.OpenRead(file.FullName))
                {
                    blobClient.Upload(fileStream);
                }

                File.Delete(file.FullName);
            }
            catch (Exception)
            { }
        }

        public FileInfo GetFile(string sourceFolder, string fileName)
        {
            return new DirectoryInfo(sourceFolder)
                .GetFiles()
                .FirstOrDefault(f => f.Name == fileName && f.Attributes.HasFlag(FileAttributes.Hidden));
        }

        public IConfigurationRoot GetConfiguration()
        {
            return new ConfigurationBuilder()
                .SetBasePath(Directory.GetParent(AppContext.BaseDirectory).FullName)
                .AddJsonFile("appsettings.json")
                .Build();
        }
    }
}
