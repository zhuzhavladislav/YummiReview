using YummiReview.Data;
using YummiReview.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using MySqlX.XDevAPI.Common;
using System.Globalization;

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

        [HttpGet]
        public ActionResult<IQueryable<Establishments>> GetEstablishments(string? name = null, string? city = null, string? averageBill = null, string? type = null, string? kitchen = null, int? pageSize = null, int? pageNumber = null)
        {
            //var query = _dbContext.Establishments.AsQueryable();

            var query = from e in _dbContext.Establishments
                        join c in _dbContext.Cities on e.City equals c.Id
                        join k in _dbContext.Kitchens on e.Kitchen equals k.Id
                        join t in _dbContext.Types on e.Type equals t.Id
                        select new
                        {
                            e.Id,
                            e.Name,
                            Type = t.Name,
                            Kitchen = k.Name,
                            City = c.Name,
                            e.Street,
                            e.Time,
                            e.AverageBill,
                            e.Phone,
                            e.Article,
                            e.Image,
                            e.ScoreFood,
                            e.ScoreService,
                            e.ScoreAtmosphere,
                            e.ScoreInterier
                        };

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
                var selectedValues = averageBill.Split(",");

                var que = query.AsEnumerable();
                que = que.Where(p =>
                    selectedValues.Any(values =>
                    {
                        string[] parts = values.Split('-');
                        int num1 = int.Parse(parts[0]);
                        int num2 = int.Parse(parts[1]);
                        return p.AverageBill >= num1 && p.AverageBill <= num2;
                    }));
                query = que.AsQueryable();
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
            var establishment = from e in _dbContext.Establishments
                        join c in _dbContext.Cities on e.City equals c.Id
                        join k in _dbContext.Kitchens on e.Kitchen equals k.Id
                        join t in _dbContext.Types on e.Type equals t.Id
                        where e.Id == id
                        select new
                        {
                            e.Id,
                            e.Name,
                            Type = t.Name,
                            Kitchen = k.Name,
                            City = c.Name,
                            e.Street,
                            e.Time,
                            e.AverageBill,
                            e.Phone,
                            e.Article,
                            e.Image,
                            e.ScoreFood,
                            e.ScoreService,
                            e.ScoreAtmosphere,
                            e.ScoreInterier
                        };

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

        [HttpGet("images/{imageName}")]
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

        [HttpPost("addImage")]
        public async Task<IActionResult> UploadImage(IFormFile image)
        {
            // Проверяем, что файл был загружен
            if (image == null || image.Length == 0)
                return BadRequest("Изображение не было выбрано или его не удалось загрузить :(");


            string? imageName;
            // Загружаем файл на сервер в папку Images и Проверяем тип файла
            if (image.ContentType == "image/jpeg")
            {
                imageName = Guid.NewGuid().ToString("N").Substring(0, 8) + ".jpeg";
            } else if (image.ContentType == "image/png")
            {
                imageName = Guid.NewGuid().ToString("N").Substring(0, 8) + ".png";
            } else
            {
                return BadRequest("Для загрузки доступны только изображения в формате PNG, JPG");
            }
            
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", imageName);
            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            return Ok(imageName);
        }
    }
}
