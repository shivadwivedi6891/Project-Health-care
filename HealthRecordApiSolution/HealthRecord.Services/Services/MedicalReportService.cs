using HealthRecord.Data.Entities;
using HealthRecord.Data.Repositories;
using HealthRecord.Services.Dtos;

namespace HealthRecord.Services
{
    public class MedicalReportService : IMedicalReportService
    {
        private readonly IMedicalReportRepository _reportRepository;
        private readonly IUserRepository _userRepository;

        public MedicalReportService(IMedicalReportRepository reportRepository, IUserRepository userRepository)
        {
            _reportRepository = reportRepository;
            _userRepository = userRepository;
        }

        public async Task<int> UploadMedicalReportAsync(int userId, UploadReportDto reportDto)
        {
            var user = await _userRepository.GetUserProfileAsync(userId);

            var report = new MedicalReport
            {
                UserId = userId,
                ReportName = reportDto.ReportName,
                ReportFilePath = reportDto.ReportFilePath
            };

            return await _reportRepository.UploadMedicalReportAsync(report);
        }

        public async Task< List<MedicalReport>> GetMedicalReportsByUserIdAsync(int userId)
        {
            var user = await _userRepository.GetUserProfileAsync(userId);
            return await _reportRepository.GetMedicalReportsByUserIdAsync(userId);
        }
    }
}