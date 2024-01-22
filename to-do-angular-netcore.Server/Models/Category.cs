using System.ComponentModel.DataAnnotations;
using to_do_angular_netcore.Server.Models.Base;

namespace to_do_angular_netcore.Server.Models
{
    public class Category : BaseEntity
    {       
        public string Name { get; set; }      
        public string Description { get; set; }
        public List<ToDo> ToDos { get; set; }

    }
}
