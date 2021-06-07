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

        public static MediaDTO GetCurrentAvatar(User user)
        {
            var avatar = user.ProfileMedia
                .FirstOrDefault(pm => pm.IsCurrent == true && pm.MediaFor == MediaFor.Avatar);
            var avatarDTO = new MediaDTO();

            avatar.CopyPropertiesTo(avatarDTO);

            return avatarDTO;
        }
    }
}
