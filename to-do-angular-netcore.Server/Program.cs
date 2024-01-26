using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using to_do_angular_netcore.Server.Data;
using to_do_angular_netcore.Server.MapperProfile;
using to_do_angular_netcore.Server.Repositories;
using to_do_angular_netcore.Server.Repositories.Interfaces;
using to_do_angular_netcore.Server.Services;
using to_do_angular_netcore.Server.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApiDBContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnection")
        //asambly => asambly.MigrationsAssembly("Data")
        );
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["ValidIssuer"]!,
        ValidAudience = builder.Configuration["ValidAudience"]!,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Secret"]!))
    };
});

builder.Services.AddAuthorization(option =>
{
    option.AddPolicy("Auth", policy =>
    {
        policy.RequireAuthenticatedUser();
    });
});


//Repository
builder.Services.AddScoped<IDBRepository, DBRepository>();

// Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IToDoService, ToDoService>();

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(o =>
{
    o.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });
    o.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Please enter the Bearer token",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
    });
    o.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
        new OpenApiSecurityScheme
        {
            Reference = new OpenApiReference
            {
                Type = ReferenceType.SecurityScheme,
                Id = "Bearer",

            }
        },
        new string[]{}
        }
    });
});
builder.Services.AddAutoMapper(typeof(MapperProfile));
builder.Services.AddCors(cors =>
{
    cors.AddPolicy("AllowOrigin",
        builder => builder.WithOrigins("https://localhost:4200")
                              .AllowAnyHeader()
                              .AllowAnyMethod());
});



var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors("AllowOrigin");

app.UseAuthentication();
app.UseAuthorization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();


