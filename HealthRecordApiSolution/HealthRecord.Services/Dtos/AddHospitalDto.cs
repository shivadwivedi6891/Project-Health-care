using System.ComponentModel.DataAnnotations;

namespace HealthRecord.Services.Dtos
{
    public class AddHospitalDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [StringLength(500)]
        public string Address { get; set; }

        // [Required]
        // public double Latitude { get; set; }

        // [Required]
        // public double Longitude { get; set; }

        [StringLength(15)]
        public string? ContactNumber { get; set; }
    }
}