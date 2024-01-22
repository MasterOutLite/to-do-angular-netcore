using to_do_angular_netcore.Server.Models;
using to_do_angular_netcore.Server.Repositories.Interfaces;
using to_do_angular_netcore.Server.Services.Interfaces;

namespace to_do_angular_netcore.Server.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        public UserService (IUserRepository repository) => _repository = repository;

        public async Task<long> Create (User user)
        {
            return await _repository.Create(user);
        }

        public async Task<bool> Delete (long id)
        {
            var user = await _repository.GetById(id);
            if (user == null)
            {
                return false;
            }
            await _repository.Delete(id);
            return true;
        }

        public async Task<IEnumerable<User>> GetAll () => await _repository.GetAll();

        public async Task<User> GetById (long id) => await _repository.GetById(id);

        public async Task<bool> Update (long id, User user)
        {
            if (id != user.Id)
            {
                return false;
            }
            await _repository.Update(user);
            return true;
        }
    }
}
