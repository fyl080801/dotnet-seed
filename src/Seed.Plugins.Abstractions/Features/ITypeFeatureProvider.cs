using System;
using Seed.Plugins.Features;

namespace Seed.Plugins
{
    public interface ITypeFeatureProvider
    {
        IFeatureInfo GetFeatureForDependency(Type dependency);

        void TryAdd(Type type, IFeatureInfo feature);
    }
}