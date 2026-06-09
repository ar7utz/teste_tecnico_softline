using api.softline.DTOs;
using api.softline.Services;
using domain.softline.Entities;
using infra.softline.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace api.softline.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UsuarioRepositorio _usuarioRepo;
        private readonly TokenService _tokenService;

        public AuthController(UsuarioRepositorio usuarioRepo, TokenService tokenService)
        {
            _usuarioRepo = usuarioRepo;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO dto)
        {
            var usuario = await _usuarioRepo.GetByLoginAsync(dto.Login);
            if (usuario == null || !BCrypt.Net.BCrypt.Verify(dto.Senha, usuario.Senha))
                return Unauthorized(new { mensagem = "Usuário ou senha inválidos" });

            var token = _tokenService.GerarToken(usuario.Login);
            return Ok(new { token });
        }
    }
}