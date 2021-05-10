using Microsoft.EntityFrameworkCore;
using SocNetwork.DTO;
using SocNetwork.Extensions;
using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Helpers
{
    public class UsersHelper
    {
        private readonly SocNetworkContext db;

        public UsersHelper(SocNetworkContext context)
        {
            db = context;
        }

        public ProfileDTO GetProfileDTO(string username)
        {
            var user = db.Users
                .Include(u => u.ProfileMedia)
                .FirstOrDefault(u => u.Username == username);

            var profileDTO = new ProfileDTO();

            user.CopyPropertiesTo<User, ProfileDTO>(profileDTO);

            profileDTO.Media = GetProfileMediaDTO(user);

            return profileDTO;
        }

        public ProfileDTO GetProfileDTO(User user)
        {
            var profileDTO = new ProfileDTO();

            user.CopyPropertiesTo<User, ProfileDTO>(profileDTO);

            profileDTO.Media = GetProfileMediaDTO(user);

            return profileDTO;
        }

        public List<ProfileMediaDTO> GetProfileMediaDTO(User user)
        {
            var media = user.ProfileMedia.ToList();

            var mediaDTO = new List<ProfileMediaDTO>();

            media.ForEach(m =>
            {
                var mDTO = new ProfileMediaDTO();
                m.CopyPropertiesTo<ProfileMedia, ProfileMediaDTO>(mDTO);
                mediaDTO.Add(mDTO);
            });

            return mediaDTO;
        }
    }
}
