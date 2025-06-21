

using HealthRecord.Services.Dtos;
using QRCoder;
using System.Text.Json;

namespace HealthRecord.Services
{
    public class QRCodeService : IQRCodeService
    {
        public async Task<byte[]> GenerateQRCodeAsync(EmergencyInfoDto emergencyInfo)
        {
            var qrGenerator = new QRCodeGenerator();
            var emergencyInfoJson = JsonSerializer.Serialize(emergencyInfo);
            var qrCodeData = qrGenerator.CreateQrCode(emergencyInfoJson, QRCodeGenerator.ECCLevel.Q);
            var qrCode = new PngByteQRCode(qrCodeData);
            var qrCodeBytes = qrCode.GetGraphic(20);
            return qrCodeBytes;
        }
    }
}