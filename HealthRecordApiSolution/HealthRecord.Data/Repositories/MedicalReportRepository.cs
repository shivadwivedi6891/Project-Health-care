using HealthRecord.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace HealthRecord.Data.Repositories
{
    public class MedicalReportRepository : IMedicalReportRepository
    {
        private readonly HealthRecordContext _context;

        public MedicalReportRepository(HealthRecordContext context)
        {
            _context = context;
        }

        public async Task<int> UploadMedicalReportAsync(MedicalReport report)
        {
            _context.MedicalReports.Add(report);
            await _context.SaveChangesAsync();
            return report.ReportId;
        }

        public async Task<List<MedicalReport>> GetMedicalReportsByUserIdAsync(int userId)
        {
          return await  _context.MedicalReports
            .Where(mr => mr.UserId == userId)
            // .Include(mr => mr.User)
            .ToListAsync();
        }
    }
}