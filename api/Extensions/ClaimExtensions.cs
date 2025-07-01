using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using api.Models;

namespace api.Extensions
{
    public static class ClaimExtensions
    {
        public static string GetUserName(this ClaimsPrincipal user)
        {
            // Try to get username from various possible claim types
            var userName = user.Claims.FirstOrDefault(c => c.Type == "given_name")?.Value
                ?? user.Claims.FirstOrDefault(c => c.Type == "unique_name")?.Value
                ?? user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value
                ?? user.Claims.FirstOrDefault(c => c.Type == "name")?.Value;

            if (string.IsNullOrEmpty(userName))
            {
                Console.WriteLine("Available claims in GetUserName:");
                foreach (var claim in user.Claims)
                {
                    Console.WriteLine($"Type: {claim.Type}, Value: {claim.Value}");
                }
                throw new UnauthorizedAccessException("User name claim not found");
            }

            return userName;
        }
    }
}