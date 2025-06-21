using Google.Protobuf.WellKnownTypes;
using HealthRecord.Data.Entities;
using HealthRecord.Services;
using HealthRecord.Services.Dtos;
using Microsoft.AspNetCore.Mvc;


namespace HealthRecordApi.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]

    public class DoctorController : ControllerBase
    {
        private readonly IDoctorService _doctorService;

        public DoctorController(IDoctorService doctorService)
        {
            _doctorService = doctorService;
        }

        [HttpPost("registerDoc")]

        public async Task<IActionResult> Register([FromBody] RegisterDoctorDto doctorDto)
        {
            var doctorId = await _doctorService.RegisterDoctorAsync(doctorDto);

            return Ok( new{ DoctorId = doctorId });
            
        }

//  [HttpPost("Doclogin")]
//         public async Task<IActionResult> DocLogin([FromBody] DocLoginDto docLoginDto)
//         {
//             try
//             {
//                 var doctorId = await _doctorService.LoginDoctorAsync(docLoginDto);
//                 return Ok(new { DoctorId = doctorId });
//             }
//             catch (Exception ex)
//             {
//                 return BadRequest(new { Message = ex.Message });
//             }
//         }
    }
}