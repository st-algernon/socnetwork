using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocNetwork.Configuration
{
    public class JwtConfig
    {
        public const string ISSUER = "SocNetworkServer";
        public const string AUDIENCE = "SocNetworkClient";
        private const string KEY = "nnuFFSju3Hh0Eamzeey3kznqbvqyYK8Q";
        public const int LIFETIME = 60;

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
