namespace to_do_angular_netcore.Server.Dto.ToDo
{
    public class ToDoQueryFilter
    {
        public int Page { get; set; } = 0;
        public int Count { get; set; } = 10;

        public ToDoColumn? SortColumn { get; set; }
        public bool SortOrder { get; set; } = true;
        public long? CategoryId { get; set; }
    }


    public enum ToDoColumn
    {
        Title,
        Category,
    }
}
