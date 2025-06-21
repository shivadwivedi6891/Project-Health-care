using HealthRecord.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace HealthRecord.Data.Repositories
{
    public class HospitalRepository : IHospitalRepository
    {
        private readonly HealthRecordContext _context;

        public HospitalRepository(HealthRecordContext context)
        {
            _context = context;
        }

        public async Task AddHospitalAsync(Hospital hospital)
        {
            _context.Hospitals.Add(hospital);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Hospital>> GetNearbyHospitalsAsync()
        {
            return await _context.Hospitals.ToListAsync();
        }
    }
}