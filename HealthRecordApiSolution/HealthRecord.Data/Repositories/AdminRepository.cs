using HealthRecord.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace HealthRecord.Data.Repositories
{
    public class AdminRepository : IAdminRepository
    {

        private readonly HealthRecordContext _context;
        

        public AdminRepository(HealthRecordContext context)
        {
            _context = context;


        }

        public async Task<Admin> GetAdminByEmailAsync(string email)
        {
            var admin = await _context.Admin
            .FirstOrDefaultAsync(a => a.Email == email);



            return admin;
        }
        public async Task<Admin> GetAdminProfileByIdAsync(int adminId)
        {
            var admin = await _context.Admin
            .FirstOrDefaultAsync(a => a.AdminId == adminId);



            return admin;
        }
        


    }
}