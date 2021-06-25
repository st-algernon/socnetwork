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
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.IO;
using Newtonsoft.Json;

namespace SocNetwork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SocNetworkContext db;
        private readonly TokenValidationParameters tokenValidationParameters;

        public AuthController(SocNetworkContext context, TokenValidationParameters validationParams)
        {
            db = context;
            tokenValidationParameters = validationParams;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            Account account = await db.Accounts.FirstOrDefaultAsync(a => a.Email == request.Email
                 && a.Password == HashHelper.ComputeSha256Hash(request.Password));

            if (account == null)
            {
                return BadRequest(new AuthResponse()
                {
                    Result = false,
                    Errors = new List<string>() { "Account doesn't exist" }
                });
            }

            var tokenHelper = new TokenHelper(db);

            return Ok(await tokenHelper.GenerateJwtAsync(account));
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegistrationRequest request)
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
                ProfileMedia = new List<ProfileMedia> { }
            };

            await db.Users.AddAsync(user);

            await db.UserRelationships.AddAsync(new UserRelationship
            {
                FromUser = user,
                ToUser = user,
                UserRelationshipType = UserRelationshipType.Followed,
                CreationDate = DateTime.UtcNow
            });

            await db.SaveChangesAsync();
            var tokenHelper = new TokenHelper(db);

            return Ok(await tokenHelper.GenerateJwtAsync(user));
        }

        [HttpPut("refresh")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenRequest tokenRequest)
        {
            if (ModelState.IsValid)
            {
                var tokenHelper = new TokenHelper(db);
                var res = await tokenHelper.VerifyToken(tokenRequest, tokenValidationParameters);

                if (res == null)
                {
                    return BadRequest(new AuthResponse()
                    {
                        Result = false,
                        Errors = new List<string>() { "Invalid tokens" }
                    });
                }

                return Ok(res);
            }

            return BadRequest(new AuthResponse()
            {
                Result = false,
                Errors = new List<string>() { "Invalid payload" }
            });
        }

        [HttpGet("verification/username/{username}")]
        public async Task<IActionResult> VerificationUsername(string username)
        {
            var result = await db.Users.AnyAsync(u => u.Username == username);

            return Ok(new VerificationResponse
            {
                Result = result
            });
        }

        [HttpGet("verification/email/{email}")]
        public async Task<IActionResult> VerificationEmail(string email)
        {
            var result = await db.Users.AnyAsync(u => u.Email == email);

            return Ok(new VerificationResponse
            {
                Result = result
            });
        }

        [HttpPost("recaptcha")]
        public IActionResult SolveRecaptcha([FromBody] RecaptchaRequest request)
        {
            const string secretKey = "6Lem90YbAAAAAJnzHCaL82ei2jJR9B9zfZYNr1PD";
            string responseFromServer = "";

            var uri = new Uri("https://www.google.com/recaptcha/api/siteverify" +
                                  $"?secret={secretKey}&response={request.Token}");
            var webRequest = WebRequest.CreateHttp(uri);
            webRequest.Method = "POST";
            webRequest.ContentType = "application/x-www-form-urlencoded";
            webRequest.ContentLength = 0;

            using (WebResponse resp = webRequest.GetResponse())
            using (Stream dataStream = resp.GetResponseStream())
            {
                if (dataStream != null)
                {
                    using var reader = new StreamReader(dataStream);
                    responseFromServer = reader.ReadToEnd();
                }
            }

            var recaptchaResponse = JsonConvert.DeserializeObject<RecaptchaResponse>(responseFromServer);

            return Ok(recaptchaResponse);
        }
    }
}
