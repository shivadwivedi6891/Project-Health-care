// using HealthRecord.Data.Repositories;
// using HealthRecord.Data.Entities;

// using HealthRecord.Services.Dtos;


// using Microsoft.Extensions.Configuration;
// using Microsoft.IdentityModel.Tokens;

// using System.IdentityModel.Tokens.Jwt;
// using System.Security.Claims;
// using System.Text;



// namespace HealthRecord.Services
// {
//     public class AuthService : IAuthService
//     {
//         public readonly IUserRepository _userRepository;
//         public readonly IDoctorRepository _doctorRepository;
//         public readonly IConfiguration _configuration;

//         public AuthService(IUserRepository userRepository, IConfiguration configuration, IDoctorRepository doctorRepository)
//         {
//             _userRepository = userRepository;
//             _doctorRepository = doctorRepository;
//             _configuration = configuration;
//         }

//         public async Task<string > LoginAndGenerateJwtTokenAsync(LoginDto loginDto)
//         {
//             var user = await _userRepository.GetUserByEmailAsync(loginDto.Email);

//             if (user == null || user.PasswordHash != loginDto.Password)
//                 throw new Exception("Invalid email or password.");

//             return GenerateJwtToken(user);
//         }

//         private string GenerateJwtToken(User user)
//         {

//             var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWTSecret:key"]!));
//             var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

//         var claims = new[]
// {
//     new Claim("userId", user.UserId.ToString())
// };


//             var token = new JwtSecurityToken(
//                 issuer: _configuration["JWTSecret:Issuer"],
//                  audience: _configuration["JWTSecret:Audience"],
//                   claims: claims,
//                 expires: DateTime.UtcNow.AddHours(1),
//                 signingCredentials: creds
//             );

//             return new JwtSecurityTokenHandler().WriteToken(token);
//     }

//     }


// }



using HealthRecord.Data.Repositories;
using HealthRecord.Data.Entities;
using HealthRecord.Services.Dtos;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace HealthRecord.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IDoctorRepository _doctorRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, IDoctorRepository doctorRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _doctorRepository = doctorRepository;
            _configuration = configuration;
        }

        public async Task<(string Token, string Role, int Id)> LoginAndGenerateJwtTokenAsync(LoginDto loginDto)
        {
            var user = await _userRepository.GetUserByEmailAsync(loginDto.Email);

            if (user != null && user.PasswordHash == loginDto.Password)
            {
                var token = GenerateJwtToken(user.UserId.ToString(), "User");
                return (token, "User", user.UserId);
            }

            var doctor = await _doctorRepository.GetDoctorByEmailAsync(loginDto.Email);
            if (doctor != null && doctor.Password == loginDto.Password)
            {
                var token = GenerateJwtToken(doctor.DoctorId.ToString(), "Doctor");
                return (token, "Doctor", doctor.DoctorId);
            }

            throw new Exception("Invalid email or password.");
        }

        private string GenerateJwtToken(string id, string role)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWTSecret:key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("id", id),
                new Claim(ClaimTypes.Role, role)
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["JWTSecret:Issuer"],
                audience: _configuration["JWTSecret:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
