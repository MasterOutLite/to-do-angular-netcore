using to_do_angular_netcore.Server.Models;

namespace to_do_angular_netcore.Server.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<long> Create (Category category);
        Task<IEnumerable<Category>> GetAll (long userId);
        Task<Category> GetById (long id, long userId);
        Task Delete(long id, long userId);
    }
}
