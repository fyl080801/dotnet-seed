using Microsoft.EntityFrameworkCore.Migrations;

namespace Seed.Data
{
    public interface IDataMigration
    {
        MigrationBuilder MigrationBuilder { get; set; }
    }
}
