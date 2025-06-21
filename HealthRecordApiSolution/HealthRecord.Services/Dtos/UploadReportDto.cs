using System.ComponentModel.DataAnnotations;

namespace HealthRecord.Services.Dtos
{
    public class UploadReportDto
    {
        [Required]
        [StringLength(100)]
        public string? ReportName { get; set; }

        [Required]
        public string ? ReportFilePath { get; set; }
    }
}