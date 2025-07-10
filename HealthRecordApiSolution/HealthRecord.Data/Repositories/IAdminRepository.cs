
using HealthRecord.Data.Entities;



namespace HealthRecord.Data.Repositories


{
    public interface IAdminRepository
    {

        Task<Admin> GetAdminByEmailAsync(string email);
        Task<Admin> GetAdminProfileByIdAsync(int adminId);

      


    }
}