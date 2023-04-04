using YummiReview.Data;
using YummiReview.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Utilities;

namespace YummiReview.Controllers
{
    [Route("api/kitchen")]
    [ApiController]
    public class KitchenController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public KitchenController(ApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        [HttpGet]
        public IActionResult GetKitchens(string? name = null)
        {
            var query = _dbContext.Kitchens.AsQueryable();

            if (!String.IsNullOrEmpty(name))
            {
                query = query.Where(p => p.Name.Contains(name));
            }

            var kitchens = query.OrderBy(c => c.Name).ToList();

            return Ok(kitchens);
        }

        [HttpPost]
        public async Task<ActionResult> Create(Kitchens kitchen)
        {
            await _dbContext.Kitchens.AddAsync(kitchen);
            await _dbContext.SaveChangesAsync();
            return Ok(kitchen.Id);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Kitchens>> GetById(int id)
        {
            var kitchen = await _dbContext.Kitchens.FindAsync(id);
            return kitchen;
        }
    }
}
