using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SocNetwork.Configuration;
using SocNetwork.DTO;
using SocNetwork.DTO.Response;
using SocNetwork.Models;
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
        public IActionResult Login(AccountLoginRequest request)
        {
            Account account = db.Accounts.FirstOrDefault(a => a.Email == request.Email
                 && a.Password == ComputeSha256Hash(request.Password));

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
        public IActionResult Register(AccountRegistrationRequest request)
        {
            Account account = db.Accounts.FirstOrDefault(a => a.Email == request.Email);
            
            if (account != null)
            {
                return BadRequest(new AuthResponse()
                {
                    Result = false,
                    Errors = new List<string>() { "A user with this email already exists" }
                });
            }

            var user = new User
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Email = request.Email,
                Username = request.Username,
                Password = ComputeSha256Hash(request.Password),
                CreationDate = DateTime.UtcNow
            };

            db.Users.Add(user);
            db.SaveChanges();

            string token = GenerateJwt(user);

            return Ok(new AuthResponse()
            {
                Result = true,
                ExpiresIn = JwtConfig.LIFETIME,
                Token = token
            });
        }

        private string ComputeSha256Hash(string data) 
        {
            using (SHA256 sha256Hash = SHA256.Create())  
            {  
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(data + HashConfig.SALT));  
  
                StringBuilder builder = new StringBuilder();  

                for (int i = 0; i < bytes.Length; i++)  
                {  
                    builder.Append(bytes[i].ToString("x2"));  
                }  

                return builder.ToString(); 
            }
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
                        new Claim(ClaimsIdentity.DefaultNameClaimType, account.Email),
                        new Claim(ClaimsIdentity.DefaultRoleClaimType, account.AccountType.ToString())
                    },
                    expires: now.Add(TimeSpan.FromMinutes(JwtConfig.LIFETIME)),
                    signingCredentials: new SigningCredentials(JwtConfig.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            var encodedJwt = jwtHandler.WriteToken(jwt);

            return encodedJwt;
        }
    }
}
