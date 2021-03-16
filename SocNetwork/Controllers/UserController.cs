using Microsoft.AspNetCore.Mvc;
using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SocNetwork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private SocNetworkContext db;

        public UserController(SocNetworkContext context)
        {
            db = context;
            if (!db.Tags.Any())
            {
                db.Tags.Add(new Tag { Content = "iPhone X" });
                db.Tags.Add(new Tag { Content = "Galaxy S8" });
                
                db.SaveChanges();
            }
        }

        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<Tag> Get()
        {
            return db.Tags.ToList();
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
