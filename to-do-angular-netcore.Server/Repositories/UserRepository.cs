using Microsoft.EntityFrameworkCore;
using to_do_angular_netcore.Server.Data;
using to_do_angular_netcore.Server.Models;
using to_do_angular_netcore.Server.Repositories.Interfaces;

namespace to_do_angular_netcore.Server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApiDBContext _context;
        public UserRepository (ApiDBContext context)
        {
            _context = context;
        }

        public async Task<long> Create (User user)
        {
            var entity = await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return entity.Entity.Id;
        }

        public async Task Delete (long id)
        {
            var entity = await _context.Users.FindAsync(id);
            entity.IsDeleted = true;
            _context.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<User>> GetAll ()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetByEmailAndPassword (string email, string password)
        {
            return await _context.Users.FindAsync(email, password);
        }

        public async Task<User> GetById (long id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task Update (User user)
        {
            _context.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}
