using System.Data;
using HealthRecord.Services.Dtos;

namespace HealthRecord.Services
{
    public interface IAuthService
    {
        Task<(string Token, string Role, int Id)> LoginAndGenerateJwtTokenAsync(LoginDto loginDto);
    }
}