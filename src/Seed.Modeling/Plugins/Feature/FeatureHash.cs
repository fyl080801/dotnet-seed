using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Plugins.Feature
{
    public class FeatureHash : IFeatureHash
    {
        public Task<int> GetFeatureHashAsync()
        {
            throw new NotImplementedException();
        }

        public Task<int> GetFeatureHashAsync(string featureId)
        {
            throw new NotImplementedException();
        }
    }
}