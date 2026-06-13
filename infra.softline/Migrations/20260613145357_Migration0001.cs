using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace infra.softline.Migrations
{
    /// <inheritdoc />
    public partial class Migration0001 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Clientes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Codigo", "Documento", "Endereco" },
                values: new object[] { 1, "123.456.789-00", "Rua das Flores, 100" });

            migrationBuilder.UpdateData(
                table: "Clientes",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Codigo", "Documento", "Endereco" },
                values: new object[] { 2, "987.654.321-00", "Av. Principal, 200" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Clientes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Codigo", "Documento", "Endereco" },
                values: new object[] { 0, "", "" });

            migrationBuilder.UpdateData(
                table: "Clientes",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Codigo", "Documento", "Endereco" },
                values: new object[] { 0, "", "" });
        }
    }
}
