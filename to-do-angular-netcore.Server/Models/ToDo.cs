using System.ComponentModel.DataAnnotations;
using to_do_angular_netcore.Server.Models.Base;

namespace to_do_angular_netcore.Server.Models
{
    public class ToDo: BaseEntity
    {
        public string Title { get; set; }     
        public string Description { get; set; }
        public bool Done { get; set; } = false;    

        public long CategoryId {  get; set; }
        public Category Category { get; set; }
    }
}
