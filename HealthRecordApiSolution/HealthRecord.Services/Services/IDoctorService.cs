using HealthRecord.Data.Entities;
using HealthRecord.Services.Dtos;

namespace HealthRecord.Services
{
    public interface IDoctorService
    {
        Task<int> RegisterDoctorAsync(RegisterDoctorDto doctorDto);
        // Task<int> LoginDoctorAsync(DocLoginDto docLoginDto);
       
    }
}