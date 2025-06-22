using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthRecord.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddIsApprovedToDoctorr : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsAproved",
                table: "Doctors",
                newName: "IsApproved");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsApproved",
                table: "Doctors",
                newName: "IsAproved");
        }
    }
}
