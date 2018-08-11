using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Seed.Data;
using Seed.Data.Migrations;
using Seed.Environment.Engine;
using Seed.Mvc.Filters;
using SeedModules.PageBuilder.Data;
using SeedModules.PageBuilder.Domain;
using SeedModules.PageBuilder.Models;

namespace SeedModules.PageBuilder.Controllers
{
    [Route("api/pagebuilder/table")]
    public class TableController : Controller
    {
        readonly IDbContext _db;
        readonly IStore _store;
        readonly EngineSettings _settings;
        readonly IDataMigrator _migrator;

        public TableController(
            IDbContext db,
            IDataMigrator migrator,
            IStore store,
            EngineSettings settings)
        {
            _db = db;
            _store = store;
            _settings = settings;
            _migrator = migrator;
        }

        [HttpPatch("fire"), HandleResult]
        public async Task Fire()
        {
            var tables = _db.Set<BuilderDefine>().Where(e => e.Type == BuilderDefineTypes.Table)
                .Select(e => e.Properties.ToObject<TableModel>())
                .ToArray();
            await _migrator.RunAsync(new PageBuilderDbContext(_store.CreateOptions(), _settings, tables));
        }
    }
}