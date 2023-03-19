using YummiReview.Data;
using YummiReview.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Utilities;

namespace YummiReview.Controllers
{
    [Route("api/city")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public CityController(ApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        [HttpGet]
        public IActionResult GetCities(string? name = null)
        {
            var query = _dbContext.Cities.AsQueryable();

            if (!String.IsNullOrEmpty(name))
            {
                query = query.Where(p => p.Name.Contains(name));
            }

            var cities = query.OrderBy(c => c.Name).ToList();

            return Ok(cities);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Cities>> GetById(int id)
        {
            var city = await _dbContext.Cities.FindAsync(id);
            return city;
        }
    }
}
