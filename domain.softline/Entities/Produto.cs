using System;
using System.Collections.Generic;
using System.Text;

namespace domain.softline.Entities
{
    public class Produto
    {
        public int Id { get; set; }
        public int Codigo { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public string CodigoBarras { get; set; } = string.Empty;
        public decimal ValorVenda { get; set; }
        public decimal PesoBruto { get; set; }
        public decimal PesoLiquido { get; set; }
    }
}
