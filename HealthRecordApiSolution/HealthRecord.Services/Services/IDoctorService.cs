using HealthRecord.Data.Entities;
using HealthRecord.Services.Dtos;

namespace HealthRecord.Services
{
    public interface IDoctorService
    {
        Task<int> RegisterDoctorAsync(RegisterDoctorDto doctorDto);
        // Task<int> LoginDoctorAsync(DocLoginDto docLoginDto);
        Task<Doctor> GetDoctorProfileAsync(int doctorId);

        Task<List<Doctor>> GetAllDoctorsAsync();
    }
}