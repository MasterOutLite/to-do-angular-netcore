using System.ComponentModel.DataAnnotations;

namespace to_do_angular_netcore.Server.Dto.User
{
    public class LoginUser
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
