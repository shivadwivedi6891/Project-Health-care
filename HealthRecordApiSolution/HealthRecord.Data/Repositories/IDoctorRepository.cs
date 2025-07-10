using HealthRecord.Data.Entities;
namespace HealthRecord.Data.Repositories
{
    public interface IDoctorRepository
    {

        Task<int> RegisterDoctorAsync(Doctor doctor);
        Task<Doctor?> GetDoctorByEmailAsync(string email);

        Task<Doctor> GetDoctorProfileAsync(int doctorId);

        Task<List<Doctor>> GetAllDoctorsAsync();


        Task<IEnumerable<Doctor>> GetAllDocsAsync();

        Task<IEnumerable<Doctor>> GetUnapprovedDoctorsAsync();

        Task<Doctor> GetDoctorByIdAsync(int doctorId);
        
        Task UpdateDoctorAsync(Doctor doctor);

    }
}