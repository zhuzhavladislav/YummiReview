using YummiReview.Data;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Security.Principal;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/* Database Context Dependency Injection */

var HOST = Environment.GetEnvironmentVariable("HOST");
var USER = Environment.GetEnvironmentVariable("USER");
var PASSWORD = Environment.GetEnvironmentVariable("PASSWORD");
var DATABASE = Environment.GetEnvironmentVariable("DATABASE");
Console.WriteLine(HOST);
Console.WriteLine(USER);
Console.WriteLine(PASSWORD);
Console.WriteLine(DATABASE);

var connectionString = $"server={HOST};port=3306;database={DATABASE};user={USER};password={PASSWORD}";
builder.Services.AddDbContext<ApplicationDbContext>(o => o.UseMySQL(connectionString));
/* ===================================== */

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles();
app.UseAuthorization();

app.MapControllers();

app.Run();
