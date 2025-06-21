using HealthRecord.Data.Entities;
namespace HealthRecord.Data.Repositories
{
    public interface IDoctorRepository
    {

        Task<int> RegisterDoctorAsync(Doctor doctor);
        Task<Doctor?> GetDoctorByEmailAsync(string email);
    }
}