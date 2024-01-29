using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using to_do_angular_netcore.Server.Dto.Category;
using to_do_angular_netcore.Server.Models;
using to_do_angular_netcore.Server.Services.Interfaces;

namespace to_do_angular_netcore.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICategoryService _categoryService;

        public CategoryController (IMapper mapper, ICategoryService categoryService)
        {
            _mapper = mapper;
            _categoryService = categoryService;
        }

        [HttpGet]
        [Authorize(Policy = "Auth")]
        [ProducesResponseType(typeof(IEnumerable<CategoryDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IEnumerable<CategoryDto>> GetAll ()
        {
            var authId = User.FindFirstValue("id")!;
            long userId = long.Parse(authId);
            IEnumerable<Category> categorys = await _categoryService.GetAll(userId);
            return _mapper.Map<List<CategoryDto>>(categorys);
        }


        [HttpGet("{id}")]
        [Authorize(Policy = "Auth")]
        [ProducesResponseType(typeof(CategoryDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetById (long id)
        {
            try
            {
                var authId = User.FindFirstValue("id")!;
                long userId = long.Parse(authId);
                Category categorys = await _categoryService.GetById(id, userId);
                return Ok(_mapper.Map<CategoryDto>(categorys));
            }
            catch (Exception ex)
            {             
                return NotFound();
            }
        }

        [HttpPost]
        [Authorize(Policy = "Auth")]
        [ProducesResponseType(typeof(CategoryDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Create (CreateCategoryDto dto)
        {
            try
            {
                var authId = User.FindFirstValue("id")!;
                long userId = long.Parse(authId);
                Category category = _mapper.Map<Category>(dto);
                category.UserId = userId;
                long id = await _categoryService.Create(category);
                CategoryDto res = _mapper.Map<CategoryDto>(category);
                return CreatedAtAction(nameof(GetById), new { id }, res);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "Auth")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Delete (long id)
        {
            try
            {
                var authId = User.FindFirstValue("id")!;
                long userId = long.Parse(authId);
                await _categoryService.Delete(id, userId);
                return NoContent();
            }
            catch (Exception ex)
            {               
                return NotFound();
            }

        }
    }
}
