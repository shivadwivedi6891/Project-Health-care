using HealthRecord.Data.Entities;

namespace HealthRecord.Data.Repositories
{
    public interface IMedicalReportRepository
    {
        Task<int> UploadMedicalReportAsync(MedicalReport report);


        // Task<List<MedicalReport>> GetMedicalReportsByUserIdAsync(int userId);
         Task<List<MedicalReport>> GetMedicalReportsByUserIdAsync(int userId);
    }
}