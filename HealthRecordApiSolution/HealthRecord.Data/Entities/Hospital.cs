using System.ComponentModel.DataAnnotations;

namespace HealthRecord.Data.Entities
{
    public class Hospital
    {
        [Key]
        public int HospitalId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [StringLength(500)]
        public string Address { get; set; }

        [Required]

        [StringLength(15)]
        public string? ContactNumber { get; set; }
    }
}