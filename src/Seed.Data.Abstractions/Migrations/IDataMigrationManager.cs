using System.Collections.Generic;
using System.Threading.Tasks;

namespace Seed.Data.Migrations
{
    public interface IDataMigrationManager
    {
        IDataMigrationManager Create(IDbContext dbContext);

        Task<IEnumerable<string>> GetFeaturesByUpdateAsync();

        Task UpdateAllFeaturesAsync();

        Task UpdateAsync(string featureId);

        Task UpdateAsync(IEnumerable<string> features);

        Task Uninstall(string featureId);
    }
}
