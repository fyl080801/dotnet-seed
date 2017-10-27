using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Data
{
    public class DataMigrationManager : IDataMigrationManager
    {
        public Task<IEnumerable<string>> GetUpdateFeaturesAsync()
        {
            throw new NotImplementedException();
        }

        public Task Uninstall(string feature)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAllFeaturesAsync()
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(string feature)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(IEnumerable<string> features)
        {
            throw new NotImplementedException();
        }
    }
}
