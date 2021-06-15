using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocNetwork.DTO;
using SocNetwork.DTO.Response;
using SocNetwork.Helpers;
using SocNetwork.Models;
using SocNetwork.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly SocNetworkContext db;
        private const int EXPIRATION_DAYS = 7;

        public TagsController(SocNetworkContext context)
        {
            db = context;
        }

        [HttpGet("trends")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Get([FromQuery] TagsPageParams tagsPageParams)
        {
            var tagDTOs = await db.Tags
                .Select(t => new TagDTO
                {
                    Id = t.Id,
                    Content = t.Content,                      
                    Amount = t.Posts.Count    
                                    
                })
                .OrderByDescending(x => x.Amount)
                .Skip((tagsPageParams.Number - 1) * tagsPageParams.Size)
                .Take(tagsPageParams.Size)
                .ToListAsync();

            return Ok(new TagsResponse
            {
                Result = true,
                Tags = tagDTOs
            });
        }
    }
}
