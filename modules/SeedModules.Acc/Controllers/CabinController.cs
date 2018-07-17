using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Seed.Data;
using Seed.Mvc.Filters;
using SeedModules.Acc.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SeedModules.Acc.Controllers
{
    [Route("api/acc/cabin"), EnableCors("acc_cors")]
    public class CabinController : Controller
    {
        readonly IDbContext _db;

        public CabinController(IDbContext db)
        {
            _db = db;
        }

        [HttpPost(), HandleResult]
        public void Save([FromBody]Cabin model)
        {
            var set = _db.Set<Cabin>();
            var domain = set.FirstOrDefault();
            if (domain != null)
            {
                domain.Children = model.Children;
                set.Update(model);
            }
            else
            {
                set.Add(model);
            }
            _db.SaveChanges();
        }

        [HttpGet(), HandleResult]
        public Cabin Load()
        {
            return _db.Set<Cabin>().FirstOrDefault();
        }
    }
}
