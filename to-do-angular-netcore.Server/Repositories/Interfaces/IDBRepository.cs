using System.Linq.Expressions;
using to_do_angular_netcore.Server.Models.Base;

namespace to_do_angular_netcore.Server.Repositories.Interfaces
{
    public interface IDBRepository
    {
        IQueryable<T> Get<T> (Expression<Func<T, bool>> selector) where T : class, IEntity;
        IQueryable<T> Get<T> () where T : class, IEntity;
        IQueryable<T> GetAll<T> () where T : class, IEntity;

        Task<long> Add<T> (T newEntity) where T : class, IEntity;
        Task AddRange<T> (IEnumerable<T> newEntities) where T : class, IEntity;

        Task Delete<T> (long entity) where T : class, IEntity;

        void Remove<T> (T entity) where T : class, IEntity;
        void RemoveRange<T> (IEnumerable<T> entities) where T : class, IEntity;

        void Update<T> (T entity) where T : class, IEntity;
        void UpdateRange<T> (IEnumerable<T> entities) where T : class, IEntity;

        Task<int> SaveChangesAsync ();
    }
}
