using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Seed.Data;
using Seed.Environment.Engine;
using Seed.Mvc.Extensions;
using Seed.Mvc.Filters;
using Seed.Mvc.Models;
using SeedModules.AngularUI.Models;
using SeedModules.AngularUI.Rendering;
using SeedModules.MindPlus.Domain;

namespace SeedModules.MindPlus.Controllers
{
    [Route("api/mindplus/works")]
    public class WorkController : Controller
    {
        readonly IDbContext _dbContext;

        public WorkController(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("query"), HandleResult]
        public PagedResult<MindWork> GetWorks([FromBody]ListQueryModel model, [FromQuery]int? parent, [FromQuery]int page, [FromQuery]int count)
        {
            var query = parent.HasValue ? _dbContext.Set<MindWork>().Where(e => e.ParentId == parent) : _dbContext.Set<MindWork>().Where(e => !e.ParentId.HasValue);

            query = query.OrderByDescending(e => e.IsFolder).OrderBy(e => e.Name);

            return new PagedResult<MindWork>(query, page, count);
        }

        [HttpPost, HandleResult]
        public void Create([FromBody]MindWork model)
        {
            if (!ModelState.IsValid) throw this.Exception(ModelState);

            _dbContext.Set<MindWork>().Add(model);

            _dbContext.SaveChanges();
        }

        [HttpGet("{id}"), HandleResult]
        public MindWork GetWork(int id)
        {
            return _dbContext.Set<MindWork>().Find(id);
        }
    }
}