using api.softline.DTOs;
using domain.softline.Entities;
using infra.softline.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.softline.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class ClienteController : ControllerBase
    {
        private readonly ClienteRepositorio _repo;

        public ClienteController(ClienteRepositorio repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _repo.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var cliente = await _repo.GetByIdAsync(id);
            if (cliente == null) return NotFound();
            return Ok(cliente);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ClienteDTO dto)
        {
            var cliente = new Cliente
            {
                Codigo = dto.Codigo,
                Nome = dto.Nome,
                Fantasia = dto.Fantasia,
                Documento = dto.Documento,
                Endereco = dto.Endereco
            };
            await _repo.AddAsync(cliente);
            return Ok(cliente);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ClienteDTO dto)
        {
            var cliente = await _repo.GetByIdAsync(id);
            if (cliente == null) return NotFound();

            cliente.Codigo = dto.Codigo;
            cliente.Nome = dto.Nome;
            cliente.Fantasia = dto.Fantasia;
            cliente.Documento = dto.Documento;
            cliente.Endereco = dto.Endereco;

            await _repo.UpdateAsync(cliente);
            return Ok(cliente);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repo.DeleteAsync(id);
            return Ok(new { mensagem = "Cliente deletado" });
        }
    }
}