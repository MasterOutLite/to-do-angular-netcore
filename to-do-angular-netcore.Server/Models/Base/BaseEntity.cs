namespace to_do_angular_netcore.Server.Models.Base
{
    public class BaseEntity : IEntity
    {
        public long Id { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
