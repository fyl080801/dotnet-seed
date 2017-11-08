using System.Collections.Generic;
using System.Threading.Tasks;

namespace Seed.Data
{
    public interface IDataMigrationManager
    {
        Task<IEnumerable<string>> GetFeaturesByUpdateAsync();

        Task UpdateAllFeaturesAsync();

        Task UpdateAsync(string feature);

        Task UpdateAsync(IEnumerable<string> features);

        Task Uninstall(string feature);
    }
}
