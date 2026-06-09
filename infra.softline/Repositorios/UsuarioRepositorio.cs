using domain.softline.Entities;
using infra.softline.Data;
using Microsoft.EntityFrameworkCore;

namespace infra.softline.Repositories
{
    public class UsuarioRepositorio
    {
        private readonly ApiDBcontext _context;

        public UsuarioRepositorio(ApiDBcontext context)
        {
            _context = context;
        }

        public async Task<Usuario?> GetByLoginAsync(string login) =>
            await _context.Usuarios.FirstOrDefaultAsync(u => u.Login == login);

        public async Task<bool> ExisteAlgumUsuarioAsync() =>
            await _context.Usuarios.AnyAsync();

        public async Task AddAsync(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
        }
    }
}