using System.ComponentModel.DataAnnotations;

namespace HealthRecord.Data.Entities
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [Range(0, 150)]
        public int Age { get; set; }

        [Required]
        [StringLength(10)]
        public string BloodGroup { get; set; }

        [StringLength(500)]
        public string? Allergies { get; set; }

        [Required]
        [StringLength(15)]
        public string EmergencyContact { get; set; }

        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(256)]
        public string PasswordHash { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public List<MedicalReport> MedicalReports { get; set; } = new List<MedicalReport>();
    }
}