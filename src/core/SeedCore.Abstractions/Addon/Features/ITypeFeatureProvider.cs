using System;
using SeedCore.Environment.Extensions.Features;

namespace SeedCore.Addon.Features
{
    public interface ITypeFeatureProvider
    {
        IFeatureInfo GetFeatureForDependency(Type dependency);
        void TryAdd(Type type, IFeatureInfo feature);
    }
}