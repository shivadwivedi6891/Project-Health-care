namespace HealthRecordApi.Dtos
{
    public class MedicalReportDto

    {
        public int ReportId { get; set; }
        public string ?ReportName { get; set; }
        public string ?ReportFilePath { get; set; }
        public DateTime UploadedAt { get; set; }
    }
}
