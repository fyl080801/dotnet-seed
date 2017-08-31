using System;
using System.Collections.Generic;
using System.Text;
using Seed.Plugin.Abstractions.Feature;
using System.Collections.Concurrent;
using Seed.Plugin.Abstractions;

namespace Seed.Plugin.Feature
{
    public class TypeFeatureProvider : ITypeFeatureProvider
    {
        private readonly ConcurrentDictionary<Type, IFeatureInfo> _features = new ConcurrentDictionary<Type, IFeatureInfo>();

        public IFeatureInfo GetFeatureForDependency(Type dependency)
        {
            if (_features.TryGetValue(dependency, out IFeatureInfo feature))
            {
                return feature;
            }

            throw new InvalidOperationException($"Could not resolve feature for type {dependency.Name}");
        }

        public void TryAdd(Type type, IFeatureInfo feature)
        {
            _features.TryAdd(type, feature);
        }
    }
}
