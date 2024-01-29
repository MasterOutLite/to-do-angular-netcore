using AutoMapper;
using to_do_angular_netcore.Server.Dto;
using to_do_angular_netcore.Server.Dto.Category;
using to_do_angular_netcore.Server.Dto.ToDo;
using to_do_angular_netcore.Server.Dto.User;
using to_do_angular_netcore.Server.Models;

namespace to_do_angular_netcore.Server.MapperProfile
{
    public class MapperProfile : Profile
    {
        public MapperProfile ()
        {
            CreateMap<CreateUserDto, User>();
            CreateMap<User, UserDto>();

            CreateMap<CreateCategoryDto, Category>();
            CreateMap<Category, CategoryDto>();

            CreateMap<CreateToDoDto, ToDo>();
            CreateMap<UpdateToDoDto, ToDo>()
                 .ForMember(dest => dest.CategoryId, opt => opt.Condition(src => src.CategoryId.HasValue))
                 .ForMember(dest => dest.Done, opt => opt.Condition(src => src.Done.HasValue))
                 .ForMember(dest => dest.Description, opt => opt.Condition(src => !String.IsNullOrWhiteSpace(src.Description)))
                 .ForMember(dest => dest.Title, opt => opt.Condition(src => !String.IsNullOrWhiteSpace(src.Title)));

            CreateMap<ToDo, ToDoDto>();
            CreateMap<PaginationDto<ToDo>, PaginationDto<ToDoDto>>();
        }
    }
}
