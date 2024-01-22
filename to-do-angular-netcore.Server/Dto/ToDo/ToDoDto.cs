namespace to_do_angular_netcore.Server.Dto.ToDo
{
    public class ToDoDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Done { get; set; }
        public long CategoryId { get; set; }
    }
}
