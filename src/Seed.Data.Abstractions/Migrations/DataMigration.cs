using Microsoft.EntityFrameworkCore.Migrations;

namespace Seed.Data.Migrations
{
    public abstract class DataMigration : IDataMigration
    {
        public MigrationBuilder MigrationBuilder { get; set; }
    }
}
