using Microsoft.EntityFrameworkCore;
using to_do_angular_netcore.Server.Exceptions;
using to_do_angular_netcore.Server.Models;
using to_do_angular_netcore.Server.Repositories.Interfaces;
using to_do_angular_netcore.Server.Services.Interfaces;

namespace to_do_angular_netcore.Server.Services
{
    public class ToDoService : IToDoService
    {
        private readonly IDBRepository _repository;
        public ToDoService (IDBRepository repository)
        {
            _repository = repository;
        }

        public async Task<long> Create (ToDo dto, long userId)
        {
            Category category = await _repository.Get<Category>(o => o.Id == dto.CategoryId)
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException("CategoryId is bad");
            dto.UserId = userId;
            long id = await _repository.Add(dto);
            await _repository.SaveChangesAsync();
            return id;
        }

        public async Task Delete (long id, long userId)
        {
            await GetById(id, userId);
            await _repository.Delete<ToDo>(id);
            await _repository.SaveChangesAsync();
        }

        public async Task<IEnumerable<ToDo>> GetAll (long userId)
        {
            return await _repository.Get<ToDo>(e => e.UserId == userId)
                .Include(i => i.Category)
                .OrderBy(o => o.Id).ToListAsync();
        }

        public async Task<ToDo> GetById (long id, long userId)
        {
            return await _repository.Get<ToDo>(o => o.Id == id && o.UserId == userId)
                .Include(o => o.Category)
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException($"Not found ToDo by id:{id}");
        }

        public async Task Update (ToDo dto, long userId)
        {
            if (dto.UserId != userId)
            {
                throw new ArgumentException("UserId is bad");
            }
            Category categor = await _repository.Get<Category>(o => o.Id == dto.CategoryId)
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException("CategoryId is bad");
            _repository.Update(dto);
            await _repository.SaveChangesAsync();
        }
    }
}
