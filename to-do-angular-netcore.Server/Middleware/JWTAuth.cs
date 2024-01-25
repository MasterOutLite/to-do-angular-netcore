
using Microsoft.Extensions.Primitives;

namespace to_do_angular_netcore.Server.Middleware
{
    public class JWTAuth : IMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _configuration;

        public JWTAuth (RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            _configuration = configuration;
        }
        public Task InvokeAsync (HttpContext context, RequestDelegate next)
        {
            Console.WriteLine(context.Request);
            Console.WriteLine(context.Request.Headers.TryGetValue("Authorization", out StringValues token));

            throw new NotImplementedException();
        }
        public void Invoke (HttpContext context, RequestDelegate next)
        {
            Console.WriteLine(context.Request);
            Console.WriteLine(context.Request.Headers["Authorization"]);
            Console.WriteLine(context.Request.Headers["Authorization"].FirstOrDefault());

        }
    }
}
