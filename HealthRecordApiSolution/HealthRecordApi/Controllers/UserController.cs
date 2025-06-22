using HealthRecord.Data.Entities;
using HealthRecord.Services;
using HealthRecord.Services.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthRecordApi.Controllers
{

    [Route("api/[controller]")]
    [Authorize(Roles = "User")]
    [ApiController()]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto userDto)
        {
            var userId = await _userService.RegisterUserAsync(userDto);
            return Ok(new { UserId = userId });
        }


        // [Authorize]
        // [HttpGet("profile/{userId}")]
        // public async Task<IActionResult> GetProfile(int userId)
        // {
        //     var user = await _userService.GetUserProfileAsync(userId);
        //     return Ok(user);
        // }

        // [HttpPut("profile/{userId}")]
        // public async Task<IActionResult> UpdateProfile(int userId, [FromBody] UpdateUserDto userDto)
        // {
        //     await _userService.UpdateUserProfileAsync(userId, userDto);
        //     return NoContent();
        // }
        
        [Authorize(Roles = "User")]
[HttpGet("GetProfile")]
public async Task<IActionResult> GetProfile()
{
    var userId = int.Parse(User.FindFirst("id")!.Value);
    var user = await _userService.GetUserProfileAsync(userId);
    
    if (user == null)
        return NotFound("User not found");

    return Ok(user);
}

[Authorize(Roles = "User")]
[HttpPut("updateProfile")]
public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserDto userDto)
{
    var userId = int.Parse(User.FindFirst("id")!.Value);
    await _userService.UpdateUserProfileAsync(userId, userDto);
    return NoContent();
}

    }
}