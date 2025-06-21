using System.ComponentModel.DataAnnotations;

namespace HealthRecord.Services.Dtos
{
    public class UpdateUserDto
    {
        [Required]
        [StringLength(100)]
        public string ? Name { get; set; }

        [Required]
        [Range(0, 150)]
        public int Age { get; set; }

        [Required]
        [StringLength(10)]
        public string ? BloodGroup { get; set; }

        [StringLength(500)]
        public string? Allergies { get; set; }

        [Required]
        [StringLength(15)]
        public string ? EmergencyContact { get; set; }
    }
}