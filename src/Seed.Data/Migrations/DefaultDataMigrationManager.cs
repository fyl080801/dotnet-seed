using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Seed.Data.Migrations
{
    public class DefaultDataMigrationManager : IDataMigrationManager
    {
        public Task<IEnumerable<string>> GetFeaturesByUpdateAsync()
        {
            throw new NotImplementedException();
        }

        public Task Uninstall(string featureId)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAllFeaturesAsync()
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(string featureId)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(IEnumerable<string> features)
        {
            throw new NotImplementedException();
        }
    }
}