using System.ComponentModel.DataAnnotations;

namespace to_do_angular_netcore.Server.Dto.ToDo
{
    public class CreateToDoDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public bool Done { get; set; } = false;
        [Required]
        public long CategoryId { get; set; }
    }
}
