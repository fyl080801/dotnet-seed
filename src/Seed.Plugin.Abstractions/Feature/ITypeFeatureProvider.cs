using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugin.Abstractions.Feature
{
    public interface ITypeFeatureProvider
    {
        IFeatureInfo GetFeatureForDependency(Type dependency);

        void TryAdd(Type type, IFeatureInfo feature);
    }
}
