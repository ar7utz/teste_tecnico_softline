using api.softline.DTOs;
using api.softline.Services;
using domain.softline.Entities;
using infra.softline.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace api.softline.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UsuarioRepositorio _usuarioRepo;
        private readonly TokenService _tokenService;

        public UserController(UsuarioRepositorio usuarioRepo, TokenService tokenService)
        {
            _usuarioRepo = usuarioRepo;
            _tokenService = tokenService;
        }

        [HttpPost("FirstAuth")]
        public async Task<IActionResult> PrimeiroUsuario([FromBody] LoginDTO dto)
        {
            if (await _usuarioRepo.ExisteAlgumUsuarioAsync())
                return BadRequest(new { mensagem = "Já existe um usuário cadastrado" });

            Usuario usuario = new()
            {
                Login = dto.Login,
                Senha = BCrypt.Net.BCrypt.HashPassword(dto.Senha)
            };

            await _usuarioRepo.AddAsync(usuario);
            return Ok(new { mensagem = "Usuário criado com sucesso" });
        }
    }
}