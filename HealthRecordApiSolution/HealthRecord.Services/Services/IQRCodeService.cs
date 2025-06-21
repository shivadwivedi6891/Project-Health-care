using HealthRecord.Services.Dtos;

namespace HealthRecord.Services
{
    public interface IQRCodeService
    {
        Task<byte[]> GenerateQRCodeAsync(EmergencyInfoDto emergencyInfo);
    }
}