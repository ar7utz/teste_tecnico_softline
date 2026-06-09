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
    public class ProdutoController : ControllerBase
    {
        private readonly ProdutoRepositorio _repo;

        public ProdutoController(ProdutoRepositorio repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _repo.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var produto = await _repo.GetByIdAsync(id);
            if (produto == null) return NotFound();
            return Ok(produto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProdutoDTO dto)
        {
            var produto = new Produto
            {
                Codigo = dto.Codigo,
                Descricao = dto.Descricao,
                CodigoBarras = dto.CodigoBarras,
                ValorVenda = dto.ValorVenda,
                PesoBruto = dto.PesoBruto,
                PesoLiquido = dto.PesoLiquido
            };
            await _repo.AddAsync(produto);
            return Ok(produto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProdutoDTO dto)
        {
            var produto = await _repo.GetByIdAsync(id);
            if (produto == null) return NotFound();

            produto.Codigo = dto.Codigo;
            produto.Descricao = dto.Descricao;
            produto.CodigoBarras = dto.CodigoBarras;
            produto.ValorVenda = dto.ValorVenda;
            produto.PesoBruto = dto.PesoBruto;
            produto.PesoLiquido = dto.PesoLiquido;

            await _repo.UpdateAsync(produto);
            return Ok(produto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repo.DeleteAsync(id);
            return Ok(new { mensagem = "Produto deletado" });
        }
    }
}