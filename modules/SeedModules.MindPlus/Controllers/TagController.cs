using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Seed.Data;
using Seed.Mvc.Filters;
using Seed.Mvc.Models;
using SeedModules.MindPlus.Domain;
using SeedModules.MindPlus.Models;

namespace SeedModules.MindPlus.Controllers
{
    [Route("api/mindplus/tags")]
    public class TagController : Controller
    {
        readonly IDbContext _dbContext;

        public TagController(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("query"), HandleResult]
        public IList<TagModel> List([FromBody]ListQueryModel model)
        {
            return _dbContext.Set<Tag>().OrderBy(e => e.Name).Select(e => new TagModel()
            {
                Id = e.Id,
                Name = e.Name,
                Color = e.Color,
                WorkItems = e.WorkItems.Count()
            }).ToList();
        }

        [HttpPost, HandleResult]
        public void Create([FromBody]Tag model)
        {
            _dbContext.Set<Tag>().Add(model);
            _dbContext.SaveChanges();
        }

        [HttpPut("{id}"), HandleResult]
        public void Update([FromBody]TagModel model, int id)
        {
            var domain = _dbContext.Set<Tag>().Find(id);
            domain.Color = model.Color;
            domain.Name = model.Name;
            _dbContext.SaveChanges();
        }

        [HttpDelete("{id}"), HandleResult]
        public void Delete(int id)
        {
            var domain = _dbContext.Set<Tag>().Find(id);
            _dbContext.Set<Tag>().Remove(domain);
            _dbContext.SaveChanges();
        }
    }
}