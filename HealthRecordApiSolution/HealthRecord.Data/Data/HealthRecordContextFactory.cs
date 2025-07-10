using Microsoft.EntityFrameworkCore;

using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace HealthRecord.Data
{
    public class HealthRecordContextFactory : IDesignTimeDbContextFactory<HealthRecordContext>
    {
        public HealthRecordContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory()) 
                .AddJsonFile("appsettings.json")
                .Build();

            var optionsBuilder = new DbContextOptionsBuilder<HealthRecordContext>();
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            optionsBuilder.UseSqlServer(connectionString);

            return new HealthRecordContext(optionsBuilder.Options);
        }
    }
}
