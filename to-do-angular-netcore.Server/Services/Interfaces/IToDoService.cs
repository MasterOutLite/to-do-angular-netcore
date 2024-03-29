﻿using to_do_angular_netcore.Server.Dto;
using to_do_angular_netcore.Server.Dto.ToDo;
using to_do_angular_netcore.Server.Models;

namespace to_do_angular_netcore.Server.Services.Interfaces
{
    public interface IToDoService
    {
        Task<long> Create (ToDo dto, long userId);
        Task Update (ToDo dto, long userId);
        Task Delete (long id, long userId);
        Task<IEnumerable<ToDo>> GetAll (long userId);
        Task<PaginationDto<ToDo>> GetAllByFilter (long userId, ToDoQueryFilter filter);
        Task<ToDo> GetById (long id, long userId);
    }
}
