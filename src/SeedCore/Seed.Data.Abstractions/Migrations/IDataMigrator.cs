using System.Threading.Tasks;

namespace Seed.Data.Migrations
{
    public interface IDataMigrator
    {
        Task RunAsync(IDbContext context);
    }
}