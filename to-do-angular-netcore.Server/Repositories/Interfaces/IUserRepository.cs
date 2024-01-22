using to_do_angular_netcore.Server.Models;

namespace to_do_angular_netcore.Server.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public Task<IEnumerable<User>> GetAll ();
        public Task<User> GetById (long id);
        public Task<User> GetByEmailAndPassword (string email, string password);
        public Task Delete (long id);
        public Task Update (User user);
        public Task<long> Create (User user);
    }
}
