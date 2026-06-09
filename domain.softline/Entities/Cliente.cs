using System;
using System.Collections.Generic;
using System.Text;

namespace domain.softline.Entities
{
    public class Cliente
    {
        public int Id { get; set; }
        public int Codigo { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Fantasia { get; set; } = string.Empty;
        public string Documento { get; set; } = string.Empty;
        public string Endereco { get; set; } = string.Empty;
    }
}
