using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Seed.Environment.Engine;
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
        [HttpPost("query"), HandleResult]
        public PagedResult<MindWork> GetWorks([FromBody]ListQueryModel model, [FromQuery]int page, [FromQuery]int count)
        {
            return new PagedResult<MindWork>(Enumerable.Empty<MindWork>().AsQueryable(), page, count);
        }
    }
}