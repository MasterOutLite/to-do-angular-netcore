using to_do_angular_netcore.Server.Models;

namespace to_do_angular_netcore.Server.Services.Interfaces
{
    public interface IToDoService
    {
        Task<long> Create (ToDo dto);
        Task Update (ToDo dto);
        Task Delete (long id);
        Task<IEnumerable<ToDo>> GetAll ();
        Task<ToDo> GetById (long id);
    }
}
