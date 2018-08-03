using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Seed.Data;
using Seed.Mvc.Extensions;
using Seed.Mvc.Filters;
using Seed.Mvc.Models;
using SeedModules.Acc.Domain;
using SeedModules.Acc.Models;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace SeedModules.Acc.Controllers
{
    [Route("api/acc/location"), EnableCors("acc_cors")]
    public class LocationController : Controller
    {
        readonly IDbContext _db;

        public LocationController(IDbContext db)
        {
            _db = db;
        }

        [HttpPost("query"), HandleResult]
        public IPagedResult<Location> List([FromBody]KeyedQueryModel model, [FromQuery]int page, [FromQuery]int count)
        {
            var query = _db.Set<Location>().AsQueryable();
            if (!string.IsNullOrEmpty(model.Keyword))
            {
                query = query.Where(e => e.Name.Contains(model.Keyword));
            }
            return new PagedResult<Location>(query, page, count);
        }

        [HttpGet("favorite"), HandleResult]
        public IEnumerable<Location> FavoriteList()
        {
            var query = _db.Set<Location>().Where(e => e.Favorite == true);
            return query.ToArray();
        }

        [HttpGet("{id}"), HandleResult]
        public Location Get(int id)
        {
            return _db.Set<Location>().Find(id);
        }

        [HttpPut, HandleResult]
        public Location Save([FromBody]Location model)
        {
            var set = _db.Set<Location>();
            var domain = set.Find(model.Id);
            if (domain == null)
            {
                model = set.Add(model).Entity;
            }
            else
            {
                domain.Description = model.Description;
                domain.Properties = model.Properties;
                domain.Name = model.Name;
            }
            _db.SaveChanges();
            return model;
        }

        [HttpPatch("favorite/{id}"), HandleResult]
        public bool SetFavorite(int id)
        {
            var domain = _db.Set<Location>().Find(id);

            if (domain == null) throw this.Exception($"找不到 {id} 的设置");

            domain.Favorite = !domain.Favorite;
            _db.SaveChanges();
            return domain.Favorite;
        }

        [HttpDelete("{id}"), HandleResult]
        public void Delete(int id)
        {
            var set = _db.Set<Location>();
            var domain = set.Find(id);
            if (domain != null)
            {
                set.Remove(domain);
                _db.SaveChanges();
            }
        }
    }
}
