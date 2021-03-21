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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SocNetwork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly SocNetworkContext db;

        public AccountController(SocNetworkContext context)
        {
            db = context;
        }

        [HttpPost("/login")]
        public IActionResult Login(AccountLoginRequest account)
        {
            if (ModelState.IsValid)
            {
                ClaimsIdentity identity = GetIdentity(account);

                if (identity == null)
                {
                    return BadRequest(new AuthResponse()
                    {
                        Result = false,
                        Errors = new List<string>() { "User doesn't exist" }
                    });
                }

                DateTime now = DateTime.UtcNow;

                JwtSecurityToken jwt = new(
                        issuer: JwtConfig.ISSUER,
                        audience: JwtConfig.AUDIENCE,
                        notBefore: now,
                        claims: identity.Claims,
                        expires: now.Add(TimeSpan.FromMinutes(JwtConfig.LIFETIME)),
                        signingCredentials: new SigningCredentials(JwtConfig.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha512Signature));

                string encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

                return Ok(new AuthResponse()
                {
                    Result = true,
                    Token = encodedJwt
                });
            }

            return BadRequest(new AuthResponse()
            {
                Result = true,
                Errors = new List<string>() { "Model is invalid" }
            });
        }

        private ClaimsIdentity GetIdentity(AccountLoginRequest account)
        {
            Account user = db.Accounts.FirstOrDefault(x => x.Email == account.Email && x.Password == account.Password);

            if (user != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, user.AccountType.ToString())
                };

                ClaimsIdentity claimsIdentity = new(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

                return claimsIdentity;
            }

            return null;
        }
    }
}
