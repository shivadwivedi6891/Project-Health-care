using HealthRecord.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace HealthRecord.Data.Repositories
{
    public class DoctorRepository : IDoctorRepository
    {
        private readonly HealthRecordContext _context;

        public DoctorRepository(HealthRecordContext context)
        {
            _context = context;
        }

        public async Task<int> RegisterDoctorAsync(Doctor doctor)
        {
            if (await _context.Doctors.AnyAsync(d => d.Email == doctor.Email))
                throw new Exception("Email already exists.");
            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();
            return doctor.DoctorId;

        }

        public async Task<Doctor> GetDoctorByEmailAsync(string email)
        {
            var doctor = await _context.Doctors
            .FirstOrDefaultAsync(d => d.Email == email);

            // if (doctor == null)
            // {
            //     throw new Exception("Not Found");
            // }

            return doctor;


        }

        public async Task<Doctor> GetDoctorProfileAsync(int doctorId)
        {
            var doctor = await _context.Doctors
        .FirstOrDefaultAsync(u => u.DoctorId == doctorId);

            if (doctor == null)

                throw new Exception("Doctor not Found");

            return doctor;

        }

        public async Task<List<Doctor>> GetAllDoctorsAsync()
        {
            return await _context.Doctors.ToListAsync();
        }
       
        public async Task<IEnumerable<Doctor>> GetAllDocsAsync()
         {
            return await _context.Doctors.ToListAsync();
        }
        public async Task<IEnumerable<Doctor>> GetAllPendingDoctorsAsync()
         {
            return await _context.Doctors.Where(b=> b.IsApproved==false)
            .ToListAsync();

        }
    }
}