using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Seed.Data;
using Seed.Mvc.Filters;
using SeedModules.PageBuilder.Domain;
using SeedModules.PageBuilder.Models;

namespace SeedModules.PageBuilder.Controllers
{
    [Route("api/pagebuilder/define")]
    public class DefineController : Controller
    {
        readonly IDbContext _db;

        public DefineController(IDbContext db)
        {
            _db = db;
        }

        [HttpGet("{type}"), HandleResult]
        public IEnumerable<BuilderDefine> List(BuilderDefineTypes type)
        {
            var query = _db.Set<BuilderDefine>();
            return query.Where(e => e.Type == type)
                .ToArray();
        }

        [HttpPut, HandleResult]
        public int Save([FromBody]BuilderDefine model)
        {
            var set = _db.Set<BuilderDefine>();
            var domain = set.FirstOrDefault(e => e.Id == model.Id && e.Type == model.Type);
            if (domain == null)
            {
                set.Add(model);
            }
            else
            {
                domain.LastModify = DateTime.Now;
                domain.Properties = model.Properties;
            }
            _db.SaveChanges();
            return domain == null ? model.Id : domain.Id;
        }

        [HttpGet("{type}/{id}"), HandleResult]
        public BuilderDefine Get(BuilderDefineTypes type, int id)
        {
            return _db.Set<BuilderDefine>().FirstOrDefault(e => e.Id == id && e.Type == type);
        }

        [HttpDelete("{id}"), HandleResult]
        public void Delete(int id)
        {
            var set = _db.Set<BuilderDefine>();
            var domain = set.Find(id);
            set.Remove(domain);
            _db.SaveChanges();
        }
    }
}