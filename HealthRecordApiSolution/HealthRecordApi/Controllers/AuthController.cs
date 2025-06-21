// using HealthRecord.Services;
// using HealthRecord.Services.Dtos;
// using Microsoft.AspNetCore.Mvc;

// namespace HealthRecordApi.Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     public class AuthController : ControllerBase
//     {
//         private readonly IAuthService _authService;
//         // private readonly IDoctorService doctorService;

//         public AuthController(IAuthService authService)
//         {
//             _authService = authService;
//         }



//         [HttpPost("login")]
//         public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
//         {
//             try
//             {
//                 // var userId = await _userService.LoginAsync(loginDto);
//                 // return Ok(new { UserId = userId });

//                 var token = await _authService.LoginAndGenerateJwtTokenAsync(loginDto);
//                 return Ok(new { Token = token });
//             }
//             catch (Exception ex)
//             {
//                 return BadRequest(new { Message = ex.Message });
//             }
//         }
       
//     }
// }







using HealthRecord.Services;
using HealthRecord.Services.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace HealthRecordApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var (token, role, id) = await _authService.LoginAndGenerateJwtTokenAsync(loginDto);
                return Ok(new { Token = token, Role = role, Id = id });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}
