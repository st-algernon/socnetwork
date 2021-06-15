using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SocNetwork.Configuration;
using SocNetwork.DTO.Request;
using SocNetwork.DTO.Response;
using SocNetwork.Models;
using SocNetwork.Helpers;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Text;  
using System.Security.Cryptography;

namespace SocNetwork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SocNetworkContext db;

        public AuthController(SocNetworkContext context)
        {
            db = context;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            Account account = db.Accounts.FirstOrDefault(a => a.Email == request.Email
                 && a.Password == HashHelper.ComputeSha256Hash(request.Password));

            if (account == null)
            {
                return BadRequest(new AuthResponse()
                {
                    Result = false,
                    Errors = new List<string>() { "Account doesn't exist" }
                });
            } 

            string token = GenerateJwt(account);

            return Ok(new AuthResponse()
            {
                Result = true,
                ExpiresIn = JwtConfig.LIFETIME,
                Token = token
            });
        }

        [HttpPost("register")]
        public IActionResult Register(RegistrationRequest request)
        {
            User user = db.Users.FirstOrDefault(
                u => u.Email == request.Email || u.Username == request.Username
            );
            
            if (user != null)
            {
                return BadRequest(new AuthResponse()
                {
                    Result = false,
                    Errors = new List<string>() { "A user with this email or username already exists" }
                });
            }
            
            user = new User
            {
                Name = request.Name,
                Email = request.Email,
                Username = request.Username,
                Password = HashHelper.ComputeSha256Hash(request.Password),
                CreationDate = DateTime.UtcNow,
                ProfileMedia = new List<ProfileMedia> {  }

            };

            db.Users.Add(user);

            db.UserRelationships.Add(new UserRelationship
            {
                FromUser = user,
                ToUser = user,
                UserRelationshipType = UserRelationshipType.Followed,
                CreationDate = DateTime.UtcNow
            });

            db.SaveChanges();

            string token = GenerateJwt(user);

            return Ok(new AuthResponse()
            {
                Result = true,
                ExpiresIn = JwtConfig.LIFETIME,
                Token = token
            });
        }

        private string GenerateJwt(Account account)
        {
            var jwtHandler = new JwtSecurityTokenHandler();
            var now = DateTime.UtcNow;

            var jwt = new JwtSecurityToken(
                    issuer: JwtConfig.ISSUER,
                    audience: JwtConfig.AUDIENCE,
                    notBefore: now,
                    claims: new List<Claim>
                    {
                        new Claim(ClaimsIdentity.DefaultNameClaimType, account.Id.ToString()),
                        new Claim(ClaimsIdentity.DefaultRoleClaimType, account.AccountType.ToString())
                    },
                    expires: now.Add(TimeSpan.FromMinutes(JwtConfig.LIFETIME)),
                    signingCredentials: new SigningCredentials(JwtConfig.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            var encodedJwt = jwtHandler.WriteToken(jwt);

            return encodedJwt;
        }
    }
}
