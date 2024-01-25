using to_do_angular_netcore.Server.Models.Base;

namespace to_do_angular_netcore.Server.Models
{
    public class User : BaseEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public List<ToDo> toDos { get; set; }
    }
}
