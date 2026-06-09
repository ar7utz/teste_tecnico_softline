using System;
using System.Collections.Generic;
using System.Text;

namespace domain.softline.Entities
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Login { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
    }
}
