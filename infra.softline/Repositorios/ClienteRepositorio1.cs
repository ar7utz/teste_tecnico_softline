using domain.softline.Entities;
using infra.softline.Data;
using Microsoft.EntityFrameworkCore;

namespace infra.softline.Repositories
{
    public class ClienteRepositorio
    {
        private readonly ApiDBcontext _context;

        public ClienteRepositorio(ApiDBcontext context)
        {
            _context = context;
        }

        public async Task<List<Cliente>> GetAllAsync() =>
            await _context.Clientes.ToListAsync();

        public async Task<Cliente?> GetByIdAsync(int id) =>
            await _context.Clientes.FindAsync(id);

        public async Task AddAsync(Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Cliente cliente)
        {
            _context.Clientes.Update(cliente);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var cliente = await GetByIdAsync(id);
            if (cliente != null)
            {
                _context.Clientes.Remove(cliente);
                await _context.SaveChangesAsync();
            }
        }
    }
}