using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using to_do_angular_netcore.Server.Dto;
using to_do_angular_netcore.Server.Dto.ToDo;
using to_do_angular_netcore.Server.Exceptions;
using to_do_angular_netcore.Server.Models;
using to_do_angular_netcore.Server.Services.Interfaces;

namespace to_do_angular_netcore.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToDoController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IToDoService _service;

        public ToDoController (IMapper mapper, IToDoService service)
        {
            _mapper = mapper;
            _service = service;
        }

        [HttpGet("{id}")]

        [ProducesResponseType(typeof(ToDoDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Get (long id)
        {
            try
            {
                var authId = User.FindFirstValue("id")!;
                long userId = long.Parse(authId);
                ToDo entity = await _service.GetById(id, userId);
                return Ok(_mapper.Map<ToDoDto>(entity));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return NotFound();
            }
        }

        [HttpGet]
        [Authorize(Policy = "Auth")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(IEnumerable<ToDoDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll ([FromQuery] ToDoQueryFilter queryFilter)
        {
            var authId = User.FindFirstValue("id")!;
            long userId = long.Parse(authId);
            var paginationToDo = await _service.GetAllByFilter(userId, queryFilter);
            return Ok(_mapper.Map<PaginationDto<ToDoDto>>(paginationToDo));
        }

        [HttpPost]
        [Authorize(Policy = "Auth")]
        [ProducesResponseType(typeof(ToDoDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Create (CreateToDoDto dto)
        {
            try
            {
                var authId = User.FindFirstValue("id")!;
                long userId = long.Parse(authId);

                var entity = _mapper.Map<ToDo>(dto);

                long id = await _service.Create(entity, userId);
                ToDoDto res = _mapper.Map<ToDoDto>(entity);
                return CreatedAtAction(nameof(Get), new { id }, res);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "Auth")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update (long id, UpdateToDoDto dto)
        {
            try
            {
                var authId = User.FindFirstValue("id")!;
                long userId = long.Parse(authId);
                ToDo entity = await _service.GetById(id, userId);
                _mapper.Map(dto, entity);
                await _service.Update(entity, userId);
                return NoContent();
            }
            catch (Exception ex) when (ex is NotFoundException || ex is ArgumentException)
            {
                return BadRequest(new { id, dto, ex });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "Auth")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete (long id)
        {
            try
            {
                var authId = User.FindFirstValue("id")!;
                long userId = long.Parse(authId);
                await _service.Delete(id, userId);
                return NoContent();
            }
            catch (NotFoundException ex)
            {
                return BadRequest(new { id, ex });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
