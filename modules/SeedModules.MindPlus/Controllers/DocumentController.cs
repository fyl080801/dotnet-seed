using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Seed.Data;
using Seed.Mvc.Filters;
using SeedModules.MindPlus.Domain;

namespace SeedModules.MindPlus.Controllers
{
    [Route("api/mindplus/document")]
    public class DocumentController : Controller
    {
        readonly IDbContext _dbContext;

        public DocumentController(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("settings"), HandleResult]
        public MindPlusSettings Load()
        {
            return _dbContext.Set<MindPlusSettings>().FirstOrDefault();
        }

        [HttpPut("settings"), HandleResult]
        public void SaveSettings([FromBody]MindPlusSettings model)
        {
            var set = _dbContext.Set<MindPlusSettings>();
            var domain = set.FirstOrDefault();
            if (domain == null)
            {
                set.Add(model);
            }
            else
            {
                domain.DocumentHost = string.Format("http://{0}", model.DocumentHost);
            }
            _dbContext.SaveChanges();
        }

        [HttpPost("{id}"), HandleResult]
        public void Upload(int id) { }
    }
}