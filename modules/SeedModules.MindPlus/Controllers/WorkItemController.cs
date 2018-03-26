using Microsoft.AspNetCore.Mvc;
using Seed.Data;
using Seed.Mvc.Filters;
using Seed.Mvc.Models;

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


    }
}