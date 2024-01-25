using Microsoft.EntityFrameworkCore;
using to_do_angular_netcore.Server.Dto.User;
using to_do_angular_netcore.Server.Exceptions;
using to_do_angular_netcore.Server.Helper;
using to_do_angular_netcore.Server.Models;
using to_do_angular_netcore.Server.Repositories.Interfaces;
using to_do_angular_netcore.Server.Services.Interfaces;

namespace to_do_angular_netcore.Server.Services
{
    public class UserService : IUserService
    {
        private readonly IDBRepository _repo;
        private readonly IConfiguration _configuration;

        public UserService (IDBRepository repo, IConfiguration configuration)
        {
            _repo = repo;
            _configuration = configuration;
        }

        public async Task<AuthUser> Create (User user)
        {
            long id = await _repo.Add(user);
            await _repo.SaveChangesAsync();
            string token = _configuration.GenerateToken(user);
            return new AuthUser(token, new UserDto(user));
        }

        public string Authorazation (LoginUser auth)
        {
            User user = _repo.Get<User>(e => e.Email == auth.Email && e.Password == auth.Password)
                .FirstOrDefault() ?? throw new NotFoundException("Not found user");
            return _configuration.GenerateToken(user);
        }

        public async Task Delete (long id)
        {
            var user = _repo.Get<User>(e => e.Id == id).FirstOrDefault()
                ?? throw new NotFoundException("Not found User");
            await _repo.Delete<User>(user.Id);
            await _repo.SaveChangesAsync();
        }

        public async Task<IEnumerable<User>> GetAll () => await _repo.Get<User>().ToListAsync();

        public async Task<User> GetById (long id) => await _repo.Get<User>(e => e.Id == id)
            .FirstOrDefaultAsync()
            ?? throw new NotFoundException("Not found user by Id");

        public async Task Update (long id, User user, long userId)
        {
            if (id != user.Id || id != userId)
            {
                throw new NotFoundException($"Id {id} was not found");
            }
            _repo.Update(user);
            await _repo.SaveChangesAsync();
        }
    }
}
