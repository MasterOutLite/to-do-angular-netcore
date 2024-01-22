using to_do_angular_netcore.Server.Models;

namespace to_do_angular_netcore.Server.Services.Interfaces
{
    public interface IUserService
    {
        public Task<IEnumerable<User>> GetAll ();
        public Task<User> GetById (long id);
        public Task<long> Create (User user);
        public Task<bool> Update (long id, User user);
        public Task<bool> Delete (long id);

    }
}
