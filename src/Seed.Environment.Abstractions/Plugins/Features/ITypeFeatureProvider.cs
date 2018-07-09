using System;
using Seed.Environment.Plugins.Features;

namespace Seed.Environment.Plugins
{
    public interface ITypeFeatureProvider
    {
        IFeatureInfo GetFeatureForDependency(Type dependency);

        void TryAdd(Type type, IFeatureInfo feature);
    }
}