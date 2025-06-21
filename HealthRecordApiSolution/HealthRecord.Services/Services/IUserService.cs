using HealthRecord.Data.Entities;
using HealthRecord.Services.Dtos;

namespace HealthRecord.Services
{
    public interface IUserService
    {
        Task<int> RegisterUserAsync(RegisterUserDto userDto);
        Task<User> GetUserProfileAsync(int userId);
        Task UpdateUserProfileAsync(int userId, UpdateUserDto userDto);
        Task<EmergencyInfoDto> GetEmergencyInfoAsync(int userId);
        // Task<int> LoginAsync(LoginDto loginDto);
    }
}