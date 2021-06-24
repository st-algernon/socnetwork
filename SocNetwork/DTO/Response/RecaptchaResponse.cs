using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Response
{
    public class RecaptchaResponse
    {
        public bool Success;
        public string ChallengeTs;
        public string Hostname;
        public object[] ErrorCodes;
    }
}
