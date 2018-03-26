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

        [HttpGet, HandleResult]
        public IList<TagModel> List()
        {
            return _dbContext.Set<Tag>().OrderBy(e => e.Name).Select(e => new TagModel()
            {
                Id = e.Id,
                Name = e.Name,
                Color = e.Color,
                WorkItems = e.WorkItems.Count()
            }).ToList();
        }
    }
}