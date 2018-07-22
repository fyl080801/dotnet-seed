using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Seed.Data;
using Seed.Mvc.Extensions;
using Seed.Mvc.Filters;
using Seed.Mvc.Models;
using SeedModules.Acc.Domain;
using SeedModules.Acc.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SeedModules.Acc.Controllers
{
    [Route("api/acc/equipment"), EnableCors("acc_cors")]
    public class EquipmentController : Controller
    {
        readonly IDbContext _db;

        public EquipmentController(IDbContext db)
        {
            _db = db;
        }


        [HttpPost("category"), HandleResult]
        public void SaveCategory([FromBody]EquipmentCategory model)
        {
            var set = _db.Set<EquipmentCategory>();
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

        [HttpGet("category"), HandleResult]
        public EquipmentCategory LoadCategory()
        {
            return _db.Set<EquipmentCategory>().FirstOrDefault();
        }

        [HttpPost("{id}/location"), HandleResult]
        public void SetLocation(int id, [FromBody]LocationInfo model)
        {
            var domain = _db.Set<Equipment>().Find(id);

        }


        [HttpPost, HandleResult]
        public void Add([FromBody]Equipment model)
        {
            var set = _db.Set<Equipment>();
            var count = set.Count(e => e.Code == model.Code);
            if (count > 0)
            {
                throw this.Exception("编号重复");
            }
            set.Add(model);
            _db.SaveChanges();
        }

        [HttpGet("{id}")]
        public Equipment GetById(int id)
        {
            return _db.Set<Equipment>().Find(id);
        }

        [HttpPost("query"), HandleResult]
        public PagedResult<Equipment> List([FromBody]ListQueryModel model, [FromQuery]int page, [FromQuery]int count)
        {
            var set = _db.Set<Equipment>();
            var query = set.OrderBy(e => e.Id).Select(e => new Equipment()
            {
                Id = e.Id,
                CabinCode = e.CabinCode,
                CabinName = e.CabinName,
                CategoryCode = e.CategoryCode,
                CategoryName = e.CategoryName,
                Code = e.Code,
                Name = e.Name
            });

            return new PagedResult<Equipment>(query, page, count);
        }
    }
}
