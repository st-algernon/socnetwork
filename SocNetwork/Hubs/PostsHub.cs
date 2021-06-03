using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SocNetwork.Helpers;
using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Hubs
{
    public class PostsHub : Hub
    {
        private readonly SocNetworkContext db;

        public PostsHub(SocNetworkContext context)
        {
            db = context;
        }

        public async Task Publish()
        {
            
        }
    }
}
