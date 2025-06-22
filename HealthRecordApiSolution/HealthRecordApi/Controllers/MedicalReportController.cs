using HealthRecord.Data.Entities;
using HealthRecord.Services;
using HealthRecord.Services.Dtos;
using HealthRecordApi.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthRecordApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicalReportController : ControllerBase
    {
        private readonly IMedicalReportService _reportService;
        private readonly IWebHostEnvironment _environment;

        public MedicalReportController(IMedicalReportService reportService, IWebHostEnvironment environment)
        {
            _reportService = reportService;
            _environment = environment;
        }


        // [Authorize]
        // [HttpPost("upload/{userId}")]
        // public async Task<IActionResult> Upload(int userId, [FromForm] UploadReportApiDto reportApiDto)
        // {
        //     var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads");
        //     if (!Directory.Exists(uploadsFolder))
        //         Directory.CreateDirectory(uploadsFolder);

        //     var filePath = Path.Combine(uploadsFolder, Guid.NewGuid().ToString() + Path.GetExtension(reportApiDto.ReportFile.FileName));
        //     using (var stream = new FileStream(filePath, FileMode.Create))
        //     {
        //         await reportApiDto.ReportFile.CopyToAsync(stream);
        //     }

        //     var reportDto = new UploadReportDto
        //     {
        //         ReportName = reportApiDto.ReportName,
        //         ReportFilePath = filePath
        //     };

        //     var reportId = await _reportService.UploadMedicalReportAsync(userId, reportDto);
        //     return Ok(new { ReportId = reportId });
        // }
        [Authorize(Roles = "User")]
        [HttpPost("upload")]
        public async Task<IActionResult> Upload([FromForm] UploadReportApiDto reportApiDto)
        {
            var userId = int.Parse(User.FindFirst("id")!.Value); // Securely extracted from JWT

            var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var filePath = Path.Combine(uploadsFolder, Guid.NewGuid().ToString() + Path.GetExtension(reportApiDto.ReportFile.FileName));
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await reportApiDto.ReportFile.CopyToAsync(stream);
            }

            var reportDto = new UploadReportDto
            {
                ReportName = reportApiDto.ReportName,
                ReportFilePath = filePath
            };

            var reportId = await _reportService.UploadMedicalReportAsync(userId, reportDto);
            return Ok(new { ReportId = reportId });
        }





        //-------------------------------//
        // [Authorize]
        // [HttpGet("userId")]

        // public async Task<IActionResult> GetMedicalReports(int userId)
        // {
        //     try
        //     {
        //         var reports = await _reportService.GetMedicalReportsByUserIdAsync(userId);
        //         var dto = reports.Select( r=> new MedicalReportDto
        //         {
        //             ReportId = r.ReportId,
        //             ReportName = r.ReportName,
        //             ReportFilePath = r.ReportFilePath,
        //             UploadedAt = r.UploadedAt
        //         });
        //            return Ok(dto);
        //     }  catch (Exception ex)
        //     {
        //         return NotFound(new { Message = ex.Message });
        //     }
        // }

        [Authorize(Roles = "User")]
[HttpGet("reports")]
public async Task<IActionResult> GetMedicalReports()
{
    try
    {
        var userId = int.Parse(User.FindFirst("id")!.Value); // Securely extracted from JWT
        var reports = await _reportService.GetMedicalReportsByUserIdAsync(userId);

        var dto = reports.Select(r => new MedicalReportDto
        {
            ReportId = r.ReportId,
            ReportName = r.ReportName,
            ReportFilePath = r.ReportFilePath,
            UploadedAt = r.UploadedAt
        });

        return Ok(dto);
    }
    catch (Exception ex)
    {
        return NotFound(new { Message = ex.Message });
    }
}

    }
}