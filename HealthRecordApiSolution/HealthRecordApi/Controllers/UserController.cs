using HealthRecord.Data.Entities;
using HealthRecord.Services;
using HealthRecord.Services.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthRecordApi.Controllers
{
     [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto userDto)
        {
            var userId = await _userService.RegisterUserAsync(userDto);
            return Ok(new { UserId = userId });
        }


        [Authorize]
        [HttpGet("profile/{userId}")]
        public async Task<IActionResult> GetProfile(int userId)
        {
            var user = await _userService.GetUserProfileAsync(userId);
            return Ok(user);
        }

        [HttpPut("profile/{userId}")]
        public async Task<IActionResult> UpdateProfile(int userId, [FromBody] UpdateUserDto userDto)
        {
            await _userService.UpdateUserProfileAsync(userId, userDto);
            return NoContent();
        }
    }
}