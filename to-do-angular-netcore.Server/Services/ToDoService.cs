using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using to_do_angular_netcore.Server.Dto;
using to_do_angular_netcore.Server.Dto.ToDo;
using to_do_angular_netcore.Server.Exceptions;
using to_do_angular_netcore.Server.Models;
using to_do_angular_netcore.Server.Repositories.Interfaces;
using to_do_angular_netcore.Server.Services.Interfaces;

namespace to_do_angular_netcore.Server.Services
{
    public class ToDoService : IToDoService
    {
        private readonly IDBRepository _repository;
        private readonly ICategoryService _categoryService;

        public ToDoService (IDBRepository repository, ICategoryService categoryService)
        {
            _repository = repository;
            _categoryService = categoryService;
        }

        public async Task<long> Create (ToDo dto, long userId)
        {
            Category category = await _categoryService.GetById(dto.CategoryId, userId);

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
                .OrderBy(o => o.Id)
                .ToListAsync();
        }

        public async Task<PaginationDto<ToDo>> GetAllByFilter (long userId, ToDoQueryFilter filter)
        {
            var query = _repository.Get<ToDo>(e => e.UserId == userId &&
              (!filter.CategoryId.HasValue || e.CategoryId == filter.CategoryId)
            );

            Expression<Func<ToDo, object>> keyFilter = filter.SortColumn switch
            {
                ToDoColumn.Title => o => o.Title,
                ToDoColumn.Category => o => o.Category,
                _ => o => o.Id,
            };

            if (filter.SortOrder)
                query = query.OrderBy(keyFilter);
            else
                query = query.OrderByDescending(keyFilter);

            var toDos = await query
                .Skip(filter.Page * filter.Count)
                .Take(filter.Count)
               .Include(i => i.Category)
               .ToListAsync();

            int total = query.Count();

            return new PaginationDto<ToDo>() { Data = toDos, Page = filter.Page, Total = total };
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
            await _categoryService.GetById(dto.CategoryId, userId);
            _repository.Update(dto);
            await _repository.SaveChangesAsync();
        }
    }
}
