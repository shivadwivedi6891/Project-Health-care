using HealthRecord.Data.Entities;

namespace HealthRecord.Data.Repositories
{
    public interface IUserRepository
    {
        Task<int> RegisterUserAsync(User user);
        Task<User> GetUserProfileAsync(int userId);
        Task UpdateUserProfileAsync(User user);
        Task<User> GetEmergencyInfoAsync(int userId);
        Task<User> GetUserByEmailAsync(string email);

        Task<IEnumerable<User>> GetAllUsersAsync();
    }
}