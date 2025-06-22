using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthRecord.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddIsApprovedToDoctor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsAproved",
                table: "Doctors",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAproved",
                table: "Doctors");
        }
    }
}
