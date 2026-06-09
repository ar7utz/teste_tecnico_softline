using Microsoft.EntityFrameworkCore;
using System;
using domain.softline.Entities;
using System.Collections.Generic;
using System.Text;

namespace infra.softline.Data
{
    public class ApiDBcontext : DbContext
    {
        public ApiDBcontext(DbContextOptions<ApiDBcontext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Cliente> Clientes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Produto>(e =>
            {
                e.Property(p => p.Descricao).HasMaxLength(60);
                e.Property(p => p.CodigoBarras).HasMaxLength(14);
                e.Property(p => p.ValorVenda).HasPrecision(10, 2);
                e.Property(p => p.PesoBruto).HasPrecision(10, 3);
                e.Property(p => p.PesoLiquido).HasPrecision(10, 3);
            });

            modelBuilder.Entity<Cliente>(e =>
            {
                e.Property(c => c.Nome).HasMaxLength(60);
                e.Property(c => c.Fantasia).HasMaxLength(100);
            });

            //SEED
            modelBuilder.Entity<Produto>().HasData(
                new Produto { Id = 1, Codigo = 101, Descricao = "Notebook Dell Inspiron", CodigoBarras = "7891234567890", ValorVenda = 3500.50m, PesoBruto = 2.5m, PesoLiquido = 2.0m },
                new Produto { Id = 2, Codigo = 102, Descricao = "Smartphone Samsung S23", CodigoBarras = "7891234567891", ValorVenda = 4200.00m, PesoBruto = 0.5m, PesoLiquido = 0.4m },
                new Produto { Id = 3, Codigo = 103, Descricao = "Monitor LG 24 Polegadas", CodigoBarras = "7891234567892", ValorVenda = 850.00m, PesoBruto = 3.2m, PesoLiquido = 2.8m }
            );

            //clientes de teste
            modelBuilder.Entity<Cliente>().HasData(
                new Cliente { Id = 1, Nome = "João Carlos", Fantasia = "João Informática" },
                new Cliente { Id = 2, Nome = "Maria Souza", Fantasia = "Maria Tech" }
            );
        }
    }
}
