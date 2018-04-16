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
    [Route("api/mindplus/workitem")]
    public class WorkItemController : Controller
    {
        readonly IDbContext _dbContext;

        public WorkItemController(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("inwork/{id}"), HandleResult]
        public IEnumerable<WorkItem> List(int id, [FromQuery]string keyword, [FromQuery]bool? finished, [FromQuery]int? owner, [FromQuery]string tags, [FromQuery]string sort)
        {
            var query = _dbContext.Set<WorkItem>().Where(e => e.MindWorkId == id);
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(e => e.Title.Contains(keyword));
            }

            if (finished.HasValue && finished.Value)
            {
                query = query.Where(e => e.Finished);
            }
            else if (finished.HasValue && !finished.Value)
            {
                query = query.Where(e => !e.Finished);
            }

            if (!string.IsNullOrEmpty(tags))
            {
                var tagArray = tags.Split(',').Where(e => int.TryParse(e, out int i)).Select(e => int.Parse(e));
                query = query.Where(e => e.Tags.Select(t => t.TagId).ToArray().Union(tagArray).Any());
            }

            return query.ToList();
        }

        [HttpPost, HandleResult]
        public void Add([FromBody]WorkItem domain)
        {
            _dbContext.Set<WorkItem>().Add(domain);
            _dbContext.SaveChanges();
        }

        [HttpPatch("{id}/parent"), HandleResult]
        public void SetParent(int id, [FromQuery]int? parentId)
        {
            var domain = _dbContext.Set<WorkItem>().Find(id);
            domain.ParentId = parentId;
            _dbContext.SaveChanges();
        }

        [HttpPatch("parents"), HandleResult]
        public void SetParents([FromBody]WorkItemParent[] models)
        {
            var changes = (models ?? new WorkItemParent[0]).Select(m => m.Id).ToArray();
            var query = _dbContext.Set<WorkItem>()
                .Where(e => changes.Contains(e.Id))
                .ToDictionary(k => k.Id, v => v);
            foreach (var model in models)
            {
                query[model.Id].ParentId = model.ParentId;
            }
            _dbContext.SaveChanges();
        }
    }
}