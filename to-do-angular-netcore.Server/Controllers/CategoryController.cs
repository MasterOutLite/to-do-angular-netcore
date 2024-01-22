using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using to_do_angular_netcore.Server.Dto.Category;
using to_do_angular_netcore.Server.Models;
using to_do_angular_netcore.Server.Services.Interfaces;

namespace to_do_angular_netcore.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
        [ProducesResponseType(typeof(IEnumerable<CategoryDto>), StatusCodes.Status200OK)]
        public async Task<IEnumerable<CategoryDto>> GetAll ()
        {
            IEnumerable<Category> categorys = await _categoryService.GetAll();
            return _mapper.Map<List<CategoryDto>>(categorys);
        }


        [HttpGet("{id}")]
        [ProducesResponseType(typeof(CategoryDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById (long id)
        {
            try
            {
                Category categorys = await _categoryService.GetById(id);
                return Ok(_mapper.Map<CategoryDto>(categorys));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return NotFound();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(CategoryDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create (CreateCategoryDto dto)
        {
            Category category = _mapper.Map<Category>(dto);
            long id = await _categoryService.Create(category);
            CategoryDto res = _mapper.Map<CategoryDto>(category);
            return CreatedAtAction(nameof(GetById), new { id }, res);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete (long id)
        {
            try
            {
                await _categoryService.Delete(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return NotFound();
            }

        }
    }
}
