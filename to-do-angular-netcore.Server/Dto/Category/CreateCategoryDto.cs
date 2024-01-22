using System.ComponentModel.DataAnnotations;

namespace to_do_angular_netcore.Server.Dto.Category
{
    public class CreateCategoryDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
