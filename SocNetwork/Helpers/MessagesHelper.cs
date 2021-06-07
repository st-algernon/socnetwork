using SocNetwork.DTO;
using SocNetwork.Extensions;
using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Helpers
{
    public class MessagesHelper
    {
        private readonly SocNetworkContext db;

        public MessagesHelper(SocNetworkContext context)
        {
            db = context;
        }

    }
}
