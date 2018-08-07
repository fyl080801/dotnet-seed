using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Seed.Data;
using SeedModules.PageBuilder.Domain;

namespace SeedModules.PageBuilder.Controllers
{
    [Route("api/pagebuilder/pages")]
    public class PageController : Controller
    {
        readonly IDbContext _db;

        public PageController(IDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IEnumerable<string> List()
        {
            var query = _db.Set<BuilderDefine>();
            return query.Where(e => e.Type == BuilderDefineTypes.Page).Select(e => e.Define).ToArray();
        }
    }
}