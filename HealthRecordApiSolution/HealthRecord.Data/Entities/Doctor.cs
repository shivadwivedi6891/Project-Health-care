using System.ComponentModel.DataAnnotations;

namespace HealthRecord.Data.Entities 
{
    public class Doctor
    {

        [Key]
        public int DoctorId { get; set; }

        [Required]
        public string Name { get; set; }


         [Required]
        public string Email { get; set; }

         [Required]
        public string Password { get; set; }

         [Required]
        public string Specialization { get; set; }



        public bool IsApproved { get; set; } = false;
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;


    }

}