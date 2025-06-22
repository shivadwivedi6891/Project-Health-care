using HealthRecord.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthRecordApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmergencyController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IQRCodeService _qrCodeService;

        public EmergencyController(IUserService userService, IQRCodeService qrCodeService)
        {
            _userService = userService;
            _qrCodeService = qrCodeService;
        }

        [Authorize]

        // [HttpGet("qr/{userId}")]
        // public async Task<IActionResult> GenerateQR(int userId)
        // {
        //     var emergencyInfo = await _userService.GetEmergencyInfoAsync(userId);
        //     var qrCode = await _qrCodeService.GenerateQRCodeAsync(emergencyInfo);
        //     return File(qrCode, "image/png");
        // }

        [Authorize(Roles = "User")]
[HttpGet("qr")]
public async Task<IActionResult> GenerateQR()
{
    var userId = int.Parse(User.FindFirst("id")!.Value); // Securely from token
    var emergencyInfo = await _userService.GetEmergencyInfoAsync(userId);
    var qrCode = await _qrCodeService.GenerateQRCodeAsync(emergencyInfo);
    return File(qrCode, "image/png");
}

    }
}