using Google.Protobuf.WellKnownTypes;
using HealthRecord.Data.Entities;
using HealthRecord.Services;
using HealthRecord.Services.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace HealthRecordApi.Controllers
{

    [Route("api/[Controller]")]
    [Authorize(Roles = "Doctor")]
    [ApiController]

    public class DoctorController : ControllerBase
    {
        private readonly IDoctorService _doctorService;

        public DoctorController(IDoctorService doctorService)
        {
            _doctorService = doctorService;
        }
        [AllowAnonymous]
        [HttpPost("registerDoc")]

        public async Task<IActionResult> Register([FromBody] RegisterDoctorDto doctorDto)
        {
            var doctorId = await _doctorService.RegisterDoctorAsync(doctorDto);

            return Ok(new { DoctorId = doctorId });

        }

        [HttpGet("Profile/{doctorId}")]

        public async Task<IActionResult> GetProfile(int doctorId)
        {
            var doctor = await _doctorService.GetDoctorProfileAsync(doctorId);
            return Ok(doctor);
        }


[AllowAnonymous]
        [HttpGet("getAllDoctor")]

        public async Task<IActionResult> GetAllDoctors()
        {
           var Doctors =  await _doctorService.GetAllDoctorsAsync();
            return Ok(Doctors);
       }





    }
}