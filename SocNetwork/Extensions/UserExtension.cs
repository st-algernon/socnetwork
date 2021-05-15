using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Extensions
{
    public static class UserExtension
    {
        public static bool EqualsExt(this User user, User other)
        {
            bool isEquals = true;

            foreach (var property in typeof(User).GetProperties())
            {
                if (property.GetValue(user) != property.GetValue(other))
                {
                    isEquals = false;
                }
            }

            return isEquals;
        }
    }
}
