using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using to_do_angular_netcore.Server.Data;
using to_do_angular_netcore.Server.Exceptions;
using to_do_angular_netcore.Server.Models.Base;
using to_do_angular_netcore.Server.Repositories.Interfaces;

namespace to_do_angular_netcore.Server.Repositories
{
    public class DBRepository : IDBRepository
    {
        private readonly ApiDBContext _context;

        public DBRepository (ApiDBContext context)
        {
            _context = context;
        }

        public async Task<long> Add<T> (T newEntity) where T : class, IEntity
        {
            var entity = await _context.Set<T>().AddAsync(newEntity);
            return entity.Entity.Id;
        }

        public async Task AddRange<T> (IEnumerable<T> newEntities) where T : class, IEntity
        {
            await _context.Set<T>().AddRangeAsync(newEntities);
        }

        public async Task Delete<T> (long id) where T : class, IEntity
        {
            var activeEntity = await _context.Set<T>().FirstOrDefaultAsync(x => x.Id == id)
                ?? throw new NotFoundException($"Not found by id:{id}");
            activeEntity.IsDeleted = true;
            _context.Update(activeEntity);
        }

        public void Remove<T> (T entity) where T : class, IEntity
        {
            _context.Set<T>().Remove(entity);
        }

        public void RemoveRange<T> (IEnumerable<T> entities) where T : class, IEntity
        {
            _context.Set<T>().RemoveRange(entities);
        }

        public void Update<T> (T entity) where T : class, IEntity
        {
            _context.Set<T>().Update(entity);
        }

        public void UpdateRange<T> (IEnumerable<T> entities) where T : class, IEntity
        {
            _context.Set<T>().UpdateRange(entities);
        }

        public async Task<int> SaveChangesAsync ()
        {
            return await _context.SaveChangesAsync();
        }

        public IQueryable<T> Get<T> () where T : class, IEntity
        {
            return _context.Set<T>().Where(x => !x.IsDeleted).AsQueryable();
        }

        public IQueryable<T> Get<T> (Expression<Func<T, bool>> selector) where T : class, IEntity
        {
            return _context.Set<T>().Where(selector).Where(x => !x.IsDeleted).AsQueryable();
        }

        public IQueryable<T> GetAll<T> () where T : class, IEntity
        {
            return _context.Set<T>().AsQueryable();
        }
    }
}
