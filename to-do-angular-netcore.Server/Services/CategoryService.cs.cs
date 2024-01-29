using Microsoft.EntityFrameworkCore;
using to_do_angular_netcore.Server.Exceptions;
using to_do_angular_netcore.Server.Models;
using to_do_angular_netcore.Server.Repositories.Interfaces;
using to_do_angular_netcore.Server.Services.Interfaces;

namespace to_do_angular_netcore.Server.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IDBRepository _repository;
        public CategoryService (IDBRepository repository) => _repository = repository;
        public async Task<long> Create (Category category)
        {
            long id = await _repository.Add(category);
            await _repository.SaveChangesAsync();
            return id;
        }

        public async Task Delete (long id, long userId)
        {
            await GetById(id, userId);
            await _repository.Delete<Category>(id);
        }

        public async Task<IEnumerable<Category>> GetAll (long userId)
        {
            return await _repository.Get<Category>(e => e.UserId == userId)
                .ToListAsync();
        }

        public async Task<Category> GetById (long id, long userId)
        {
            Category res = await _repository.Get<Category>(o => o.Id == id && o.UserId == userId)
                .FirstOrDefaultAsync() ?? throw new NotFoundException("CategoryId is bad");
            return res;
        }
    }
}
