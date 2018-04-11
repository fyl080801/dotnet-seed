using Microsoft.AspNetCore.Mvc;
using Seed.Data;
using Seed.Mvc.Filters;
using Seed.Mvc.Models;
using SeedModules.MindPlus.Domain;

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

        [HttpPost, HandleResult]
        public void Add([FromBody]WorkItem domain)
        {
            _dbContext.Set<WorkItem>().Add(domain);
            _dbContext.SaveChanges();
        }
    }
}