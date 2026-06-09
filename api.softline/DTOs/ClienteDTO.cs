namespace api.softline.DTOs
{
    public class ClienteDTO
    {
        public int Codigo { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Fantasia { get; set; } = string.Empty;
        public string Documento { get; set; } = string.Empty;
        public string Endereco { get; set; } = string.Empty;
    }
}