using HealthRecord.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace HealthRecord.Data
{
    public class HealthRecordContext : DbContext
    {
        public HealthRecordContext(DbContextOptions<HealthRecordContext> options)
            : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<MedicalReport> MedicalReports { get; set; }
        public DbSet<Hospital> Hospitals { get; set; }
        public DbSet<Doctor> Doctors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(u => u.MedicalReports)
                .WithOne(m => m.User)
                .HasForeignKey(m => m.UserId);
        }
    }
}