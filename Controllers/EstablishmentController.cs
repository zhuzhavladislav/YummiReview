using YummiReview.Data;
using YummiReview.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace YummiReview.Controllers
{
    [Route("api/establishment")]
    [ApiController]
    public class EstablishmentController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public EstablishmentController(ApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }
        /*
        [HttpGet]
        public ActionResult<IEnumerable<Establishment>> GetEstablishments()
        {
            return _dbContext.Establishments;
        }
        */

        [HttpGet]
        public ActionResult<IQueryable<Establishments>> GetEstablishments(string? name = null, string? city = null, string? averageBill = null, string? type = null, string? kitchen = null, int? pageSize = null, int? pageNumber = null)
        {
            //var query = _dbContext.Establishments.AsQueryable();


            var query = _dbContext.Establishments
                .Join(
                    _dbContext.Cities,
                    o => o.City,
                    c => c.Id,
                    (o, c) => new
                    {
                        o.Id,
                        o.Name,
                        o.Type,
                        o.Description,
                        o.Kitchen,
                        City = c.Name,
                        o.Street,
                        o.Time,
                        o.AverageBill,
                        o.Phone,
                        o.Title,
                        o.Article,
                        o.Image,
                        o.ScoreFood,
                        o.ScoreService,
                        o.ScoreAtmosphere,
                        o.ScoreInterier
                    }
                ).Join(_dbContext.Kitchens,
                    o => o.Kitchen,
                    c => c.Id,
                    (o, c) => new
                    {
                        o.Id,
                        o.Name,
                        o.Type,
                        o.Description,
                        Kitchen = c.Name,
                        o.City,
                        o.Street,
                        o.Time,
                        o.AverageBill,
                        o.Phone,
                        o.Title,
                        o.Article,
                        o.Image,
                        o.ScoreFood,
                        o.ScoreService,
                        o.ScoreAtmosphere,
                        o.ScoreInterier
                    }
                    ).Join(_dbContext.Types,
                    o => o.Type,
                    c => c.Id,
                    (o, c) => new
                    {
                        o.Id,
                        o.Name,
                        Type = c.Name,
                        o.Description,
                        o.Kitchen,
                        o.City,
                        o.Street,
                        o.Time,
                        o.AverageBill,
                        o.Phone,
                        o.Title,
                        o.Article,
                        o.Image,
                        o.ScoreFood,
                        o.ScoreService,
                        o.ScoreAtmosphere,
                        o.ScoreInterier
                    }
                    ).AsQueryable();

            if (!String.IsNullOrEmpty(name))
            {
                query = query.Where(p => p.Name.Contains(name));
            }
            if (!String.IsNullOrEmpty(city))
            {
                query = query.Where(p => p.City == city);
            }
            if (!String.IsNullOrEmpty(averageBill))
            {
                string[] parts = averageBill.Split('-');
                int num1 = int.Parse(parts[0]);
                int num2 = int.Parse(parts[1]);

                query = query.Where(p => (p.AverageBill >= num1) && (p.AverageBill <= num2));
            }
            if (!String.IsNullOrEmpty(type))
            {
                query = query.Where(p => p.Type == type);
            }
            if (!String.IsNullOrEmpty(kitchen))
            {
                query = query.Where(p => p.Kitchen == kitchen);
            }



            if (pageNumber != null && pageSize != null)
            {
                var establishments = query.Skip((int)((pageNumber - 1) * pageSize)).Take((int)pageSize).ToList();
                var result = new
                {
                    Count = query.Count(),
                    Establishments = establishments
                };
                return Ok(result);
            } 
            else
            {
                var establishments = query.ToList();
                var result = new
                {
                    Count = query.Count(),
                    Establishments = establishments
                };
                return Ok(result);
            }

            
        }

        [HttpGet("{id:int}")]
        public ActionResult<IQueryable<Establishments>> GetById(int id)
        {
            var establishment = _dbContext.Establishments
                .Join(
                _dbContext.Cities,
                o => o.City,
                c => c.Id,
                (o, c) => new
                {
                    Id = o.Id,
                    Name = o.Name,
                    Type = o.Type,
                    Description = o.Description,
                    Kitchen = o.Kitchen,
                    City = c.Name,
                    Street = o.Street,
                    Time = o.Time,
                    AverageBill = o.AverageBill,
                    Phone = o.Phone,
                    Title = o.Title,
                    Article = o.Article,
                    Image = o.Image,
                    ScoreFood = o.ScoreFood,
                    ScoreService = o.ScoreService,
                    ScoreAtmosphere = o.ScoreAtmosphere,
                    ScoreInterier = o.ScoreInterier
                }
            ).Join(_dbContext.Kitchens,
                o => o.Kitchen,
                c => c.Id,
                (o, c) => new
                {
                    Id = o.Id,
                    Name = o.Name,
                    Type = o.Type,
                    Description = o.Description,
                    Kitchen = c.Name,
                    City = o.City,
                    Street = o.Street,
                    Time = o.Time,
                    AverageBill = o.AverageBill,
                    Phone = o.Phone,
                    Title = o.Title,
                    Article = o.Article,
                    Image = o.Image,
                    ScoreFood = o.ScoreFood,
                    ScoreService = o.ScoreService,
                    ScoreAtmosphere = o.ScoreAtmosphere,
                    ScoreInterier = o.ScoreInterier
                }
                ).Join(_dbContext.Types,
                o => o.Type,
                c => c.Id,
                (o, c) => new
                {
                    Id = o.Id,
                    Name = o.Name,
                    Type = c.Name,
                    Description = o.Description,
                    Kitchen = o.Kitchen,
                    City = o.City,
                    Street = o.Street,
                    Time = o.Time,
                    AverageBill = o.AverageBill,
                    Phone = o.Phone,
                    Title = o.Title,
                    Article = o.Article,
                    Image = o.Image,
                    ScoreFood = o.ScoreFood,
                    ScoreService = o.ScoreService,
                    ScoreAtmosphere = o.ScoreAtmosphere,
                    ScoreInterier = o.ScoreInterier
                }
                ).AsQueryable().Where(p => p.Id == id);

            return Ok(establishment);
        }

        [HttpPost]
        public async Task<ActionResult> Create(Establishments establishment)
        {
            await _dbContext.Establishments.AddAsync(establishment);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> Update(Establishments establishment)
        {
            _dbContext.Establishments.Update(establishment);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var establishment = await _dbContext.Establishments.FindAsync(id);
            _dbContext.Establishments.Remove(establishment);
            return Ok();
        }

        [HttpGet("{imageName}")]
        public IActionResult GetImage(string imageName)
        {
            // Получаем бинарные данные из сохраненного файла
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", imageName);
            var imageFileStream = System.IO.File.OpenRead(imagePath);
            var bytes = new byte[imageFileStream.Length];
            imageFileStream.Read(bytes, 0, (int)imageFileStream.Length);

            // Возвращаем изображение в ответе
            return File(bytes, "image/jpeg");
        }

        [HttpPost("{imageName}")]
        public async Task<IActionResult> UploadImage(IFormFile image)
        {
            // Проверяем, что файл был загружен
            if (image == null || image.Length == 0)
                return BadRequest("Image file is not selected");

            // Проверяем тип файла
            if (image.ContentType != "image/jpeg")
                return BadRequest("Only JPEG file is allowed");

            // Загружаем файл на сервер в папку Images
            var imageName = Guid.NewGuid().ToString("N").Substring(0, 8) + ".jpeg";
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", imageName);
            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            // Возвращаем URL, по которому можно получить загруженное изображение
            //var imageUrl = Url.Action("GetImage", new { imageName = imageName }, Request.Scheme, Request.Host.Value);

            //return Ok(new { imageUrl });
            return Ok(imagePath);
        }
    }
}
