﻿using Seed.Plugins.Descriptors;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Seed.Plugins.Feature
{
    public class CompositeFeaturesProvider : IFeaturesProvider
    {
        private readonly IFeaturesProvider[] _featuresProviders;

        public CompositeFeaturesProvider(params IFeaturesProvider[] featuresProviders)
        {
            _featuresProviders = featuresProviders ?? new IFeaturesProvider[0];
        }

        public CompositeFeaturesProvider(IEnumerable<IFeaturesProvider> featuresProviders)
        {
            if (featuresProviders == null)
            {
                throw new ArgumentNullException(nameof(featuresProviders));
            }
            _featuresProviders = featuresProviders.ToArray();
        }

        public IEnumerable<IFeatureInfo> GetFeatures(IPluginInfo pluginInfo, IDescriptorInfo descriptorInfo)
        {
            List<IFeatureInfo> featureInfos = new List<IFeatureInfo>();

            foreach (var provider in _featuresProviders)
            {
                featureInfos.AddRange(provider.GetFeatures(pluginInfo, descriptorInfo));
            }

            return featureInfos;
        }
    }
}