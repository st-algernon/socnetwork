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
        public const string DEFAULT_AVATAR_PATH = "asssets\\images\\default-avatar.jpg";

        public UsersHelper(SocNetworkContext context)
        {
            db = context;
        }

        public static void ResetCurrentProfileMedia(User user, MediaFor resetFor)
        {
            var media = user.ProfileMedia.Where(m => m.IsCurrent == true && m.MediaFor == resetFor).ToList();

            media.ForEach(m => m.IsCurrent = false);
        }

        public static ProfileMedia GetCurrentAvatar(User user)
        {
            return user?.ProfileMedia?.FirstOrDefault(pm => pm.IsCurrent == true && pm.MediaFor == MediaFor.Avatar);
        }

        public static ProfileMedia GetCurrentCover(User user)
        {
            return user?.ProfileMedia?.FirstOrDefault(pm => pm.IsCurrent == true && pm.MediaFor == MediaFor.Cover);
        }

        public static ProfileMediaDTO GetCurrentAvatarDTO(User user)
        {
            var avatar = user.ProfileMedia
                .FirstOrDefault(pm => pm.IsCurrent == true && pm.MediaFor == MediaFor.Avatar);
            var avatarDTO = new ProfileMediaDTO();

            avatar.CopyPropertiesTo(avatarDTO);

            return avatarDTO;
        }
    }
}
