using HealthRecord.Data.Entities;
using HealthRecord.Services.Dtos;


namespace HealthRecord.Services
{
    public interface IAdminService
    {
        Task<Admin> GetAdminProfileAsync(int AdminId);

        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<IEnumerable<DoctorDto>> GetAllDoctorsAsync();

        // Task<IEnumerable<Doctor>> GetPendingDoctorsAsync();


        Task<IEnumerable<DoctorDto>> GetUnapprovedDoctorsAsync();
        Task ApproveDoctorAsync(int doctorId);
        



    }
}