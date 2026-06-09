using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace infra.softline.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Produtos",
                columns: new[] { "Id", "Codigo", "Descricao", "CodigoBarras", "ValorVenda", "PesoBruto", "PesoLiquido" },
                values: new object[,]
                {
                    { 1, 101, "Notebook Dell Inspiron", "7891234567890", 3500.50m, 2.500m, 2.000m },
                    { 2, 102, "Smartphone Samsung S23", "7891234567891", 4200.00m, 0.500m, 0.400m },
                    { 3, 103, "Monitor LG 24 Polegadas", "7891234567892", 850.00m, 3.200m, 2.800m }
                });

            migrationBuilder.InsertData(
                table: "Clientes",
                columns: new[] { "Id", "Codigo", "Nome", "Fantasia", "Documento", "Endereco" },
                values: new object[,]
                {
                    { 1, 1, "João Carlos", "João Informática", "123.456.789-00", "Rua das Flores, 100" },
                    { 2, 2, "Maria Souza", "Maria Tech", "987.654.321-00", "Av. Principal, 200" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(table: "Produtos", keyColumn: "Id", keyValues: new object[] { 1, 2, 3 });
            migrationBuilder.DeleteData(table: "Clientes", keyColumn: "Id", keyValues: new object[] { 1, 2 });
        }
    }
}
