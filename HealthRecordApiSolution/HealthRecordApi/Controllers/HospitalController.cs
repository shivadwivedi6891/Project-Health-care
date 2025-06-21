using HealthRecord.Data.Entities;
using HealthRecord.Services;
using HealthRecord.Services.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace HealthRecordApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalController : ControllerBase
    {
        private readonly IHospitalService _hospitalService;

        public HospitalController(IHospitalService hospitalService)
        {
            _hospitalService = hospitalService;
        }

        [HttpGet("nearby")]
        public async Task<IActionResult> GetNearbyHospitals()
        {
            var hospitals = await _hospitalService.GetNearbyHospitalsAsync();
            return Ok(hospitals);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddHospital([FromBody] AddHospitalDto hospitalDto)
        {
            await _hospitalService.AddHospitalAsync(hospitalDto);
            return Ok(new { Message = "Hospital added successfully." });
        }
    }
}