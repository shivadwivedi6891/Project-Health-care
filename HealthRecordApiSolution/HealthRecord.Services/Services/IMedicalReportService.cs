using HealthRecord.Data.Entities;
using HealthRecord.Services.Dtos;

namespace HealthRecord.Services
{
    public interface IMedicalReportService
    {
        Task<int> UploadMedicalReportAsync(int userId, UploadReportDto reportDto);
        Task<List<MedicalReport>> GetMedicalReportsByUserIdAsync(int userId);
      
    }
}