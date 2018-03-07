using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Seed.Data;
using Seed.Mvc.Filters;
using Seed.Mvc.Models;
using SeedModules.Security.Domain;

namespace SeedModules.Admin.Controllers
{
    [Route("api/admin/users")]
    public class UserController : Controller
    {
        readonly IDbContext _dbContext;

        public UserController(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("query"), HandleResult]
        public PagedResult<User> List([FromBody]QueryModel model, [FromQuery]int page, [FromQuery]int count)
        {
            var userSet = _dbContext.Set<User>();
            var query = userSet.OrderBy(e => e.Username);

            return new PagedResult<User>(query, page, count);
        }
    }
}