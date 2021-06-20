using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SocNetwork.Configuration;
using SocNetwork.DTO.Request;
using SocNetwork.DTO.Response;
using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SocNetwork.Helpers
{
    public class TokenHelper
    {
        private readonly SocNetworkContext db;
        public TokenHelper(SocNetworkContext context)
        {
            db = context;
        }

        public async Task<AuthResponse> GenerateJwtAsync(Account account)
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
                        new Claim(ClaimsIdentity.DefaultRoleClaimType, account.AccountType.ToString()),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    },
                    expires: now.Add(TimeSpan.FromMinutes(JwtConfig.LIFETIME)),
                    signingCredentials: new SigningCredentials(JwtConfig.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            var encodedJwt = jwtHandler.WriteToken(jwt);

            var refreshToken = new RefreshToken()
            {
                JwtId = jwt.Id,
                IsUsed = false,
                UserId = account.Id,
                AddedDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddDays(15),
                IsRevoked = false,
                Token = Guid.NewGuid().ToString()
            };

            await db.RefreshTokens.AddAsync(refreshToken);
            await db.SaveChangesAsync();

            return new AuthResponse()
            {
                Result = true,
                Token = encodedJwt,
                RefreshToken = refreshToken.Token,
                ExpiresIn = JwtConfig.LIFETIME
            };
        }

        public async Task<AuthResponse> VerifyToken(TokenRequest tokenRequest, TokenValidationParameters tokenValidationParameters)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            try
            {
                var principal = jwtTokenHandler.ValidateToken(tokenRequest.Token, tokenValidationParameters, out var validatedToken);

                if (validatedToken is JwtSecurityToken jwtSecurityToken)
                {
                    var result = jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase);

                    if (result == false)
                    {
                        return null;
                    }
                }

                var utcExpiryDate = long.Parse(principal.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp).Value);
                var expDate = UnixTimeStampToDateTime(utcExpiryDate);

                if (expDate > DateTime.UtcNow)
                {
                    return new AuthResponse()
                    {
                        Result = false,
                        Errors = new List<string>() { "We cannot refresh this since the token has not expired" }
                    };
                }

                var storedRefreshToken = await db.RefreshTokens.FirstOrDefaultAsync(x => x.Token == tokenRequest.RefreshToken);

                if (storedRefreshToken == null)
                {
                    return new AuthResponse()
                    {
                        Result = false,
                        Errors = new List<string>() { "Refresh token doesnt exist" }
                    };
                }

                if (DateTime.UtcNow > storedRefreshToken.ExpiryDate)
                {
                    return new AuthResponse()
                    {
                        Result = false,
                        Errors = new List<string>() { "Refresh token has expired, user needs to relogin" }
                    };
                }

                // check if the refresh token has been used
                if (storedRefreshToken.IsUsed)
                {
                    return new AuthResponse()
                    {
                        Result = false,
                        Errors = new List<string>() { "Token has been used" }
                    };
                }

                // Check if the token is revoked
                if (storedRefreshToken.IsRevoked)
                {
                    return new AuthResponse()
                    {
                        Result = false,
                        Errors = new List<string>() { "Token has been revoked" }
                    };
                }

                // we are getting here the jwt token id
                var jti = principal.Claims.SingleOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

                // check the id that the recieved token has against the id saved in the db
                if (storedRefreshToken.JwtId != jti)
                {
                    return new AuthResponse()
                    {
                        Result = false,
                        Errors = new List<string>() { "The token doesn't matched the saved token" }
                    };
                }

                storedRefreshToken.IsUsed = true;
                db.RefreshTokens.Update(storedRefreshToken);
                await db.SaveChangesAsync();

                var dbUser = await db.Users.FirstOrDefaultAsync(u => u.Id == storedRefreshToken.UserId);

                var tokenHelper = new TokenHelper(db);
                return await tokenHelper.GenerateJwtAsync(dbUser);
            }
            catch (Exception ex)
            {
                var _ex = ex;
                return null;
            }
        }

        private DateTime UnixTimeStampToDateTime(double unixTimeStamp)
        {
            DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddSeconds(unixTimeStamp).ToUniversalTime();
            return dtDateTime;
        }
    }
}
