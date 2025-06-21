using HealthRecord.Data.Entities;
using HealthRecord.Data.Repositories;
using HealthRecord.Services.Dtos;

namespace HealthRecord.Services
{
    public class HospitalService : IHospitalService
    {
        private readonly IHospitalRepository _hospitalRepository;

        public HospitalService(IHospitalRepository hospitalRepository)
        {
            _hospitalRepository = hospitalRepository;
        }

        public async Task AddHospitalAsync(AddHospitalDto hospitalDto)
        {
            var hospital = new Hospital
            {
                Name = hospitalDto.Name,
                Address = hospitalDto.Address,
                ContactNumber = hospitalDto.ContactNumber
            };

            await _hospitalRepository.AddHospitalAsync(hospital);
        }

        public async Task<List<Hospital>> GetNearbyHospitalsAsync()
        {
            return await _hospitalRepository.GetNearbyHospitalsAsync();
        }
    }
}