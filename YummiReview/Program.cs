using YummiReview.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

/* Database Context Dependency Injection */

var HOST = Environment.GetEnvironmentVariable("HOST");
var USER = Environment.GetEnvironmentVariable("USER");
var PASSWORD = Environment.GetEnvironmentVariable("PASSWORD");
var DATABASE = Environment.GetEnvironmentVariable("DATABASE");

var connectionString = "server=localhost;port=3306;database=yummireviewdb;user=root;password=FYU!8F6:x,,v3!@!ek2:";
builder.Services.AddDbContext<ApplicationDbContext>(o => o.UseMySQL(connectionString));
/* ===================================== */

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
