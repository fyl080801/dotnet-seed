using Microsoft.EntityFrameworkCore.Migrations;

namespace Seed.Data.Migrations
{
    public interface IDataMigration
    {
        MigrationBuilder MigrationBuilder { get; set; }
    }
}
