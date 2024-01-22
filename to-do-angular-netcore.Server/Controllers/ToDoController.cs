using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using to_do_angular_netcore.Server.Dto.ToDo;
using to_do_angular_netcore.Server.Exceptions;
using to_do_angular_netcore.Server.Models;
using to_do_angular_netcore.Server.Services.Interfaces;

namespace to_do_angular_netcore.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
                ToDo entity = await _service.GetById(id);
                return Ok(_mapper.Map<ToDoDto>(entity));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return NotFound();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ToDoDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll ()
        {
            var entity = await _service.GetAll();
            return Ok(_mapper.Map<List<ToDoDto>>(entity));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ToDoDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create (CreateToDoDto dto)
        {
            try
            {
                var entity = _mapper.Map<ToDo>(dto);
                long id = await _service.Create(entity);
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
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update (long id, UpdateToDoDto dto)
        {
            try
            {
                if (id != dto.Id)
                {
                    return BadRequest(new { id, dto });
                }
                ToDo entity = await _service.GetById(id);
                _mapper.Map(dto, entity);
                await _service.Update(entity);
                return NoContent();
            }
            catch (NotFoundException ex)
            {
                return BadRequest(new { id, dto, ex });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete (long id)
        {
            try
            {
                await _service.Delete(id);
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
