using System.ComponentModel.DataAnnotations;

namespace HealthRecord.Services.Dtos
{
    public class RegisterDoctorDto
    {

        [Required]
        [StringLength(100)]
        public string? Name { get; set; }

        [Required]
        [StringLength(100)]
        public string? Email { get; set; }


        [Required]
        [StringLength(100)]
        public string? Password { get; set; }


        [Required]
        [StringLength(100)]
        public string? Specialization { get; set; }


        public bool IsApproved { get; set; } = false;
    }
}