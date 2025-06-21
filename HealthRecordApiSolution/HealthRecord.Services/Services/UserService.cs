using HealthRecord.Data.Entities;
using HealthRecord.Data.Repositories;
using HealthRecord.Services.Dtos;

namespace HealthRecord.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<int> RegisterUserAsync(RegisterUserDto userDto)
        {
            if (!new[] { "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-" }.Contains(userDto.BloodGroup))
                throw new ArgumentException("Invalid blood group.");

            var user = new User
            {
                Name = userDto.Name, 
                Age = userDto.Age,
                BloodGroup = userDto.BloodGroup,
                Allergies = userDto.Allergies,
                EmergencyContact = userDto.EmergencyContact,
                Email = userDto.Email,
                PasswordHash = userDto.Password 
            };

            return await _userRepository.RegisterUserAsync(user);
        }

        public async Task<User> GetUserProfileAsync(int userId)
        {
            return await _userRepository.GetUserProfileAsync(userId);
        }

        public async Task UpdateUserProfileAsync(int userId, UpdateUserDto userDto)
        {
            if (!new[] { "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-" }.Contains(userDto.BloodGroup))
                throw new ArgumentException("Invalid blood group.");

            var user = await _userRepository.GetUserProfileAsync(userId);
            user.Name =  userDto.Name;
            user.Age = userDto.Age;
            user.BloodGroup = userDto.BloodGroup;
            user.Allergies = userDto.Allergies;
            user.EmergencyContact = userDto.EmergencyContact;

            await _userRepository.UpdateUserProfileAsync(user);
        }

        public async Task<EmergencyInfoDto> GetEmergencyInfoAsync(int userId)
        {
            var user = await _userRepository.GetEmergencyInfoAsync(userId);
            return new EmergencyInfoDto
            {
                Name = user.Name,
                Age = user.Age,
                BloodGroup = user.BloodGroup,
                Allergies = user.Allergies,
                EmergencyContact = user.EmergencyContact
            };
        }

        // public async Task<int> LoginAsync(LoginDto loginDto)
        // {
        //     var user = await _userRepository.GetUserByEmailAsync(loginDto.Email);

        //     if (user.PasswordHash != loginDto.Password) 
        //         throw new Exception("Wrong credentials.");

        //     return user.UserId;
        // }
    }
}