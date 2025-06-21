using HealthRecord.Data.Entities;

namespace HealthRecord.Data.Repositories
{
    public interface IHospitalRepository
    {
        Task AddHospitalAsync(Hospital hospital);
        Task<List<Hospital>> GetNearbyHospitalsAsync();
    }
}