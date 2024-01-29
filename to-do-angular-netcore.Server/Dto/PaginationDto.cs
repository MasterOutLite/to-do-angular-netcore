namespace to_do_angular_netcore.Server.Dto
{
    public class PaginationDto<T>
    {
        public PaginationDto ()
        {
        }

        public PaginationDto (int page, int total, List<T> data)
        {
            Page = page;
            Total = total;
            Data = data;
        }

        public int Page { get; set; }
        public int Total { get; set; }
        public IEnumerable<T> Data { get; set; }
    }
}
