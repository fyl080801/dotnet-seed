using Microsoft.EntityFrameworkCore;
using Seed.Plugins;
using Seed.Plugins.Feature;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Data
{
    public class DataMigrationManager : IDataMigrationManager
    {
        readonly DbContext _dbContext;
        readonly IPluginManager _pluginManager;
        readonly ITypeFeatureProvider _typeFeatureProvider;

        public DataMigrationManager(
            DbContext dbContext,
            IPluginManager pluginManager,
            ITypeFeatureProvider typeFeatureProvider)
        {
            _dbContext = dbContext;
            _pluginManager = pluginManager;
            _typeFeatureProvider = typeFeatureProvider;
        }

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
