using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using to_do_angular_netcore.Server.Dto.User;
using to_do_angular_netcore.Server.Models;
using to_do_angular_netcore.Server.Services.Interfaces;

namespace to_do_angular_netcore.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        private readonly IMapper _mapper;

        public UserController (IUserService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Policy = "Auth")]
        [ProducesResponseType(typeof(IEnumerable<UserDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetAll ()
        {
            var users = await _service.GetAll();
            List<UserDto> usersDtos = _mapper.Map<List<UserDto>>(users);
            return Ok(new { usersDtos });
        }

        [HttpGet("{id}")]
        [Authorize(Policy = "Auth")]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetById (long id)
        {
            try
            {
                User user = await _service.GetById(id);
                UserDto dto = _mapper.Map<UserDto>(user);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return NotFound();
            }

        }

        [HttpPut("{id}")]
        [Authorize(Policy = "Auth")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Update (long id, User user)
        {
            try
            {
                var authId = User.FindFirstValue("id")!;
                long parseId = long.Parse(authId);               
                await _service.Update(id, user, parseId);
                return NoContent();
            }
            catch { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "Auth")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Delete (int id)
        {
            try
            {
                var authId = User.FindFirstValue("id")!;
                if (long.Parse(authId) != id)
                {
                    return BadRequest();
                }

                await _service.Delete(id);
                return NoContent();
            }
            catch { return NotFound(); }
        }

        [HttpPost("registration")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(AuthUser), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create (CreateUserDto dto)
        {
            User user = _mapper.Map<User>(dto);
            AuthUser auth = await _service.Create(user);
            return CreatedAtAction(nameof(GetById), new { auth.User.Id }, auth);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Authorization (LoginUser dto)
        {
            try
            {
                string token = _service.Authorazation(dto);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
