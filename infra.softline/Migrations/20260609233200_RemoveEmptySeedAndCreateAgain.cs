using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace infra.softline.Migrations
{
    /// <inheritdoc />
    public partial class RemoveEmptySeedAndCreateAgain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Clientes",
                columns: new[] { "Id", "Codigo", "Documento", "Endereco", "Fantasia", "Nome" },
                values: new object[,]
                {
                    { 1, 0, "", "", "João Informática", "João Carlos" },
                    { 2, 0, "", "", "Maria Tech", "Maria Souza" }
                });

            migrationBuilder.InsertData(
                table: "Produtos",
                columns: new[] { "Id", "Codigo", "CodigoBarras", "Descricao", "PesoBruto", "PesoLiquido", "ValorVenda" },
                values: new object[,]
                {
                    { 1, 101, "7891234567890", "Notebook Dell Inspiron", 2.5m, 2.0m, 3500.50m },
                    { 2, 102, "7891234567891", "Smartphone Samsung S23", 0.5m, 0.4m, 4200.00m },
                    { 3, 103, "7891234567892", "Monitor LG 24 Polegadas", 3.2m, 2.8m, 850.00m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Clientes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Clientes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Produtos",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Produtos",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Produtos",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
