

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
        private readonly IAdminRepository _adminRepository;
        private readonly IConfiguration _configuration;

        

        public AuthService(IUserRepository userRepository,IAdminRepository adminRepository, IDoctorRepository doctorRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _doctorRepository = doctorRepository;
            _adminRepository = adminRepository;
            _configuration = configuration;
        }

        public async Task<(string Token, string Role, int Id)> LoginAndGenerateJwtTokenAsync(LoginDto loginDto)
        {

              var admin = await _adminRepository.GetAdminByEmailAsync(loginDto.Email);
            if (admin != null && admin.Password == loginDto.Password)
            {
                var token = GenerateJwtToken(admin.AdminId.ToString(), "Admin");
                return (token, "Admin", admin.AdminId);
            }

              var doctor = await _doctorRepository.GetDoctorByEmailAsync(loginDto.Email);
            if (doctor != null && doctor.Password == loginDto.Password)
            {
                 if (!doctor.IsApproved)
                   throw new Exception("Your account is pending admin approval.");
                var token = GenerateJwtToken(doctor.DoctorId.ToString(), "Doctor");
                return (token, "Doctor", doctor.DoctorId);
            }

            var user = await _userRepository.GetUserByEmailAsync(loginDto.Email);
            if (user != null && user.PasswordHash == loginDto.Password)
            {
                var token = GenerateJwtToken(user.UserId.ToString(), "User");
                return (token, "User", user.UserId);
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
