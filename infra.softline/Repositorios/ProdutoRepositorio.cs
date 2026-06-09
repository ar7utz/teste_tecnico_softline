using domain.softline.Entities;
using infra.softline.Data;
using Microsoft.EntityFrameworkCore;

namespace infra.softline.Repositories
{
    public class ProdutoRepositorio
    {
        private readonly ApiDBcontext _context;

        public ProdutoRepositorio(ApiDBcontext context)
        {
            _context = context;
        }

        public async Task<List<Produto>> GetAllAsync() =>
            await _context.Produtos.ToListAsync();

        public async Task<Produto?> GetByIdAsync(int id) =>
            await _context.Produtos.FindAsync(id);

        public async Task AddAsync(Produto produto)
        {
            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Produto produto)
        {
            _context.Produtos.Update(produto);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var produto = await GetByIdAsync(id);
            if (produto != null)
            {
                _context.Produtos.Remove(produto);
                await _context.SaveChangesAsync();
            }
        }
    }
}