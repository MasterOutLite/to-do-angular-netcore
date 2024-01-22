using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using to_do_angular_netcore.Server.Dto.User;
using to_do_angular_netcore.Server.Models;
using to_do_angular_netcore.Server.Services.Interfaces;

namespace to_do_angular_netcore.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _context;
        private readonly IMapper _mapper;

        public UserController (IUserService context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<UserDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll ()
        {
            var users = await _context.GetAll();
            return Ok(_mapper.Map<List<UserDto>>(users));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById (long id)
        {
            UserDto user = _mapper.Map<UserDto>(await _context.GetById(id));
            return user == null ? NotFound() : Ok(user);
        }

        [HttpPost]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create (CreateUserDto dto)
        {
            User user = _mapper.Map<User>(dto);
            long id = await _context.Create(user);
            UserDto res = _mapper.Map<UserDto>(user);
            return CreatedAtAction(nameof(GetById), new { id }, res);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update (long id, User user)
        {
            bool res = await _context.Update(id, user);
            if (!res)
            {
                return BadRequest();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete (int id)
        {
            var res = await _context.Delete(id);
            if (!res)
                return NotFound();
            return NoContent();
        }
    }
}
