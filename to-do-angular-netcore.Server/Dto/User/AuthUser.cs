namespace to_do_angular_netcore.Server.Dto.User
{
    public class AuthUser
    {
        public string Token { get; set; }
        public UserDto User { get; set; }

        public AuthUser (string token, UserDto user)
        {
            Token = token;
            User = user;
        }
    }
}
