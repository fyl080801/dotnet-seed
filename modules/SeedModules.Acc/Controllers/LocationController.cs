using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Seed.Data;
using Seed.Mvc.Filters;
using SeedModules.Acc.Domain;
using System;
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

        [HttpGet("areas"), HandleResult]
        public IEnumerable<Area> List()
        {
            var location = _db.Set<Location>().FirstOrDefault() ?? new Location();
            location.Areas = location.Areas ?? new List<Area>();
            return location != null ? location.Areas.OrderBy(e => e.Name).ToList() : new List<Area>();
        }

        [HttpPost("areas"), HandleResult]
        public void SaveArea([FromBody]Area model)
        {
            var set = _db.Set<Location>();
            var location = set.FirstOrDefault();
            if (location == null)
            {
                location = new Location()
                {
                    Areas = new List<Area>()
                };
                _db.Set<Location>().Add(location);
            }

            location.Areas = location.Areas ?? new List<Area>();

            var existed = location.Areas.FirstOrDefault(e => e.Code == model.Code);
            if (existed != null)
            {
                location.Areas.Remove(existed);
            }
            else
            {
                model.Code = Guid.NewGuid().ToString();
            }

            location.Areas.Add(model);

            set.Update(location);

            _db.SaveChanges();
        }

        [HttpDelete("areas/{id}"), HandleResult]
        public void DeleteArea(string id)
        {
            var set = _db.Set<Location>();
            var location = set.FirstOrDefault();
            if (location != null)
            {
                var existed = location.Areas.FirstOrDefault(e => e.Code == id);
                if (existed != null)
                {
                    location.Areas.Remove(existed);
                    _db.SaveChanges();
                }
            }
        }
    }
}
