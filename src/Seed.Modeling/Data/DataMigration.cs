using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Seed.Data
{
    public abstract class DataMigration : IDataMigration
    {
        public MigrationBuilder MigrationBuilder { get; set; }
    }
}
