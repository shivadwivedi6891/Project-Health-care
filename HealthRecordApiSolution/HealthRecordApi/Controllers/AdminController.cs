using HealthRecord.Services;
using HealthRecord.Services.Dtos;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;



namespace HealthRecordApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController()]

    public class AdminController : ControllerBase
    {

        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;


        }


        // [HttpGet("GetAdmin/{adminId}")]

        // public async Task<IActionResult> GetAdmin(int adminId)
        // {
        //     var admin = await _adminService.GetAdminProfileAsync(adminId);
        //     return Ok(admin);
        // }

        [Authorize(Roles = "Admin")]
        [HttpGet("GetAdminProfile")]
        public async Task<IActionResult> GetAdmin()
        {
            var adminId = int.Parse(User.FindFirst("id")!.Value);  // Extracted from JWT

            var admin = await _adminService.GetAdminProfileAsync(adminId);
            if (admin == null)
                return NotFound("Admin not found");

            return Ok(admin);
        }




        [Authorize(Roles = "Admin")]
        [HttpGet("Users")]

        public async Task<IActionResult> GetUsers()
        {
            var users = await _adminService.GetAllUsersAsync();

            return Ok(users);

        }


        [Authorize(Roles = "Admin")]
        [HttpGet("doctors")]
        public async Task<IActionResult> GetAllDoctors()
        {
            var doctors = await _adminService.GetAllDoctorsAsync();
            return Ok(doctors);
        }


        // [Authorize(Roles = "Admin")]
        // [HttpGet("PendingDoctors")]
        // public async Task<IActionResult> GetPendingDoctors()
        // {
        //     var pendingDoctors = await _adminService.GetAllPenidingDoctorsAsync();
        //     return Ok(pendingDoctors);
        // }


// [Authorize(Roles = "Admin")]
// [HttpPut("ApproveDoctor/{doctorId}")]
// public async Task<IActionResult> ApproveDoctor(int doctorId)
// {
//     var doctor = await _context.Doctors.FindAsync(doctorId);
//     if (doctor == null)
//         return NotFound();

//     doctor.IsApproved = true;
//     await _context.SaveChangesAsync();
//     return Ok(new { Message = "Doctor approved successfully" });
// }



    }

}