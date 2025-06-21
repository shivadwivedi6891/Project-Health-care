using System.ComponentModel.DataAnnotations;

namespace HealthRecord.Services.Dtos

{

  public class DocLoginDto
  {
    [Required]
    [EmailAddress]
    public string? Email { get; set; }

    [Required]

    public string? Password { get; set; }
  }
}