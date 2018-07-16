using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Seed.Data;
using Seed.Mvc.Filters;
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

        }

        [HttpGet("{id}")]
        public Equipment GetById(int id)
        {
            return _db.Set<Equipment>().Find(id);
        }
    }
}
