using to_do_angular_netcore.Server.Dto.User;
using to_do_angular_netcore.Server.Models;

namespace to_do_angular_netcore.Server.Services.Interfaces
{
    public interface IUserService
    {
        public Task<IEnumerable<User>> GetAll ();
        public Task<User> GetById (long id);
        public Task<AuthUser> Create (User user);
        public Task Update (long id, User user, long userId);
        public Task Delete (long id);
        public string Authorazation (LoginUser auth);

    }
}
