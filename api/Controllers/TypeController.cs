using api.Data;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Utilities;

namespace api.Controllers
{
    [Route("api/type")]
    [ApiController]
    public class TypeController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public TypeController(ApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        [HttpGet]
        public IActionResult GetTypes(string? name = null)
        {
            var query = _dbContext.Types.AsQueryable();

            if (!String.IsNullOrEmpty(name))
            {
                query = query.Where(p => p.Name.Contains(name));
            }

            var types = query.OrderBy(c => c.Name).ToList();

            return Ok(types);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Types>> GetById(int id)
        {
            var type = await _dbContext.Types.FindAsync(id);
            return type;
        }
    }
}
