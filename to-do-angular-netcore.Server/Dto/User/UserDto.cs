namespace to_do_angular_netcore.Server.Dto.User
{
    public class UserDto
    {
        public UserDto ()
        {
        }

        public UserDto (Models.User user)
        {
            Id = user.Id;
            Name = user.Name;
            Email = user.Email;
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
