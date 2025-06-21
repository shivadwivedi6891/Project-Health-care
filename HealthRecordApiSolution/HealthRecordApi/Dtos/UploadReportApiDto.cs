using Microsoft.AspNetCore.Http;

namespace HealthRecordApi.Dtos
{
    public class UploadReportApiDto
    {
        public string ? ReportName { get; set; }
        public IFormFile ?ReportFile { get; set; }
    }
}