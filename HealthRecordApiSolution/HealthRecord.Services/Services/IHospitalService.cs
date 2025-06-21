using HealthRecord.Data.Entities;
using HealthRecord.Services.Dtos;

namespace HealthRecord.Services
{
    public interface IHospitalService
    {
        Task AddHospitalAsync(AddHospitalDto hospitalDto);
        Task<List<Hospital>> GetNearbyHospitalsAsync();
    }
}