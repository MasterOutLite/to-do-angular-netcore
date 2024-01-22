namespace to_do_angular_netcore.Server.Models.Base
{
    public interface IEntity
    {
        long Id { get; set; }
        bool IsDeleted { get; set; }
    }
}
