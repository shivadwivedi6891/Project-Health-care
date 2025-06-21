using System.ComponentModel.DataAnnotations;

namespace HealthRecord.Data.Entities
{
    public class MedicalReport
    {
       



        [Key]
        public int ReportId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        [StringLength(100)]
        public string ReportName { get; set; }

        [Required]
        public string ReportFilePath { get; set; }

        public DateTime UploadedAt { get; set; } = DateTime.Now;

        public User User { get; set; }
    }
}