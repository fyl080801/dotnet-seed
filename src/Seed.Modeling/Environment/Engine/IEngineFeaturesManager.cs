using Seed.Plugins.Feature;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public interface IEngineFeaturesManager
    {
        Task<IEnumerable<IFeatureInfo>> GetEnabledFeaturesAsync();

        Task<IEnumerable<IFeatureInfo>> EnableFeaturesAsync(IEnumerable<IFeatureInfo> features);

        Task<IEnumerable<IFeatureInfo>> EnableFeaturesAsync(IEnumerable<IFeatureInfo> features, bool force);

        Task<IEnumerable<IFeatureInfo>> GetDisabledFeaturesAsync();

        Task<IEnumerable<IFeatureInfo>> DisableFeaturesAsync(IEnumerable<IFeatureInfo> features);

        Task<IEnumerable<IFeatureInfo>> DisableFeaturesAsync(IEnumerable<IFeatureInfo> features, bool force);
    }
}
