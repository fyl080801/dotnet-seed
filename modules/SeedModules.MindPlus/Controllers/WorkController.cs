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

        [HttpGet("tree"), HandleResult]
        public IEnumerable<MindWork> GetWorks([FromQuery]int? parent)
        {
            var query = parent.HasValue ? _dbContext.Set<MindWork>().Where(e => e.ParentId == parent) : _dbContext.Set<MindWork>().Where(e => !e.ParentId.HasValue);

            return query.OrderByDescending(e => e.IsFolder).OrderBy(e => e.Name).ToList();
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

        //----------------------------------------------------------

        [HttpGet("{id}/status"), HandleResult]
        public IEnumerable<WorkItemStatus> Status(int id)
        {
            var query = _dbContext.Set<WorkItemStatus>().Where(e => e.MindWorkId == id).OrderBy(e => e.Order);
            return query.ToList();
        }

        [HttpPost("{id}/status"), HandleResult]
        public void AddStatus(int id, [FromBody]WorkItemStatus domain)
        {
            domain.MindWorkId = id;
            var set = _dbContext.Set<WorkItemStatus>();
            if (set.FirstOrDefault(e => e.Name == domain.Name && e.MindWorkId == id) != null)
            {
                ModelState.AddModelError("Name", "名称重复了");
            }

            if (!ModelState.IsValid)
            {
                throw this.Exception(ModelState);
            }

            set.Add(domain);
            _dbContext.SaveChanges();
        }


        [HttpPut("status"), HandleResult]
        public void UpdateStatus([FromBody]WorkItemStatus domain)
        {
            var set = _dbContext.Set<WorkItemStatus>();
            if (set.FirstOrDefault(e => e.Name == domain.Name && e.MindWorkId == domain.MindWorkId) != null)
            {
                ModelState.AddModelError("Name", "名称重复了");
            }

            if (!ModelState.IsValid)
            {
                throw this.Exception(ModelState);
            }
            var old = set.Find(domain.Id);
            old.Name = domain.Name;
            old.Order = domain.Order;

            _dbContext.SaveChanges();
        }

        [HttpDelete("status/{id}"), HandleResult]
        public void DeleteStatus(int id)
        {
            var set = _dbContext.Set<WorkItemStatus>();
            set.Remove(set.Find(id));
            _dbContext.SaveChanges();
        }
    }
}