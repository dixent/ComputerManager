using ComputerManager.Models;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ComputerManager.Data.Migrations
{
    public partial class InitializeComputers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateTable(
                name: "Computers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false).Annotation("SqlServer:Identity", "1, 1"),
                    Firm = table.Column<string>(nullable: false),
                    Version = table.Column<string>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    Year = table.Column<int>(nullable: false),
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "Computers");
        }
    }
}
