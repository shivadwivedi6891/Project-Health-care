using System.ComponentModel.DataAnnotations;

namespace HealthRecord.Services.Dtos
{
    public class DoctorDto
    {
        public int DoctorId { get; set; }
        public string ?Name { get; set; }
        public string ?Email { get; set; }
        public string ?Specialization { get; set; }

         public bool IsApproved { get; set; } = false;
    
}

}