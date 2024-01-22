using Microsoft.EntityFrameworkCore;
using to_do_angular_netcore.Server.Models;

namespace to_do_angular_netcore.Server.Data
{
    public class ApiDBContext : DbContext
    {
        public DbSet<ToDo> ToDo { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<User> Users { get; set; }

        public ApiDBContext (DbContextOptions<ApiDBContext> options) : base(options)
        { }
    }
}
