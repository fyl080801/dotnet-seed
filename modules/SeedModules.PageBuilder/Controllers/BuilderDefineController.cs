using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OData;
using Seed.Data;
using SeedModules.PageBuilder.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SeedModules.PageBuilder.Controllers
{
    public class BuilderDefineController : ODataController
    {
        readonly IDbContext _db;

        public BuilderDefineController(IDbContext db)
        {
            _db = db;
        }

        public IActionResult Get(ODataQueryOptions<BuilderDefine> queryOptions)
        {
            try
            {
                var items = queryOptions.ApplyTo(_db.Set<BuilderDefine>());

                return Ok(items as IQueryable<BuilderDefine>);
            }
            catch (ODataException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public IActionResult Get([FromODataUri]int key, ODataQueryOptions<BuilderDefine> queryOptions)
        {
            try
            {
                BuilderDefine domain = _db.Set<BuilderDefine>().Find(key);
                if (domain == null)
                {
                    return NotFound();
                }

                return Ok(domain);
            }
            catch (ODataException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[HttpGet]
        //[ODataRoute("BuilderDefine({id})")]
        //public BuilderDefine Get(int id)
        //{
        //    return _db.Set<BuilderDefine>().Find(id);
        //}
    }
}
