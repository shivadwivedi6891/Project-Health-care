using System.ComponentModel.DataAnnotations;

namespace HealthRecord.Services.Dtos
{
    public class UserDto
    {
        public int UserId { get; set; }
        public string ?Name { get; set; }
        public string ?Email { get; set; }
    public int Age { get; set; }
}
}
