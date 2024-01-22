namespace to_do_angular_netcore.Server.Exceptions
{
    public class NotFoundException : Exception
    {
        public int Status { get; } = 404;
        public NotFoundException (string message) : base(message) { }
    }
}
