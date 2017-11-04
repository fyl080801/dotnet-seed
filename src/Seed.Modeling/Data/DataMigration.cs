using Microsoft.EntityFrameworkCore.Migrations;

namespace Seed.Data
{
    public abstract class DataMigration : IDataMigration
    {
        public MigrationBuilder MigrationBuilder { get; set; }
    }
}
