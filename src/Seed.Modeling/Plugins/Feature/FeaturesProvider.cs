using Microsoft.Extensions.Logging;
using Seed.Plugins.Descriptors;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Seed.Plugins.Feature
{
    public class FeaturesProvider : IFeaturesProvider
    {
        public const string FeatureProviderCacheKey = "FeatureProvider:Features";

        private static string NameKey = "Name";
        private static string PriorityKey = "Priority";
        private static string DependenciesKey = "Dependencies";
        private static string CategoryKey = "Category";
        private static string DescriptionKey = "Description";

        private readonly IEnumerable<IFeatureBuilderEvents> _featureBuilderEvents;

        private readonly ILogger _logger;

        public FeaturesProvider(IEnumerable<IFeatureBuilderEvents> featureBuilderEvents, ILogger<FeaturesProvider> logger)
        {
            _featureBuilderEvents = featureBuilderEvents;
            _logger = logger;
        }

        public IEnumerable<IFeatureInfo> GetFeatures(IPluginInfo pluginInfo, IDescriptorInfo descriptorInfo)
        {
            var features = new List<IFeatureInfo>();

            var featuresSectionChildren = descriptorInfo.ConfigurationRoot.GetSection("Features").GetChildren().ToList();
            if (featuresSectionChildren.Count > 0)
            {
                foreach (var featureSection in featuresSectionChildren)
                {
                    var featureId = featureSection.Key;

                    var featureDetails = featureSection.GetChildren().ToDictionary(x => x.Key, v => v.Value);

                    var featureName =
                        featureDetails.ContainsKey(NameKey) ?
                            featureDetails[NameKey] : descriptorInfo.Name;

                    var featureDependencyIds = featureDetails.ContainsKey(DependenciesKey) ?
                        featureDetails[DependenciesKey]
                            .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                            .Select(e => e.Trim())
                            .ToArray() : new string[0];

                    var descriptorFeatureDetails = descriptorInfo
                        .ConfigurationRoot.GetChildren().ToDictionary(x => x.Key, v => v.Value);

                    var featurePriority = featureDetails.ContainsKey(PriorityKey) ?
                            int.Parse(featureDetails[PriorityKey]) :
                            (descriptorFeatureDetails.ContainsKey(PriorityKey) ? int.Parse(descriptorFeatureDetails[PriorityKey]) : 0);

                    var featureCategory =
                        featureDetails.ContainsKey(CategoryKey) ?
                            featureDetails[CategoryKey] :
                            (descriptorFeatureDetails.ContainsKey(CategoryKey) ? descriptorFeatureDetails[CategoryKey] : null);

                    var featureDescription =
                        featureDetails.ContainsKey(DescriptionKey) ?
                            featureDetails[DescriptionKey] :
                            (descriptorFeatureDetails.ContainsKey(DescriptionKey) ? descriptorFeatureDetails[DescriptionKey] : null);

                    var context = new FeatureBuildingContext
                    {
                        FeatureId = featureId,
                        FeatureName = featureName,
                        Category = featureCategory,
                        Description = featureDescription,
                        PluginInfo = pluginInfo,
                        FeatureDetails = featureDetails,
                        DescriptorDetails = descriptorFeatureDetails,
                        DescriptorInfo = descriptorInfo,
                        Priority = featurePriority,
                        FeatureDependencyIds = featureDependencyIds
                    };

                    foreach (var builder in _featureBuilderEvents)
                    {
                        builder.Building(context);
                    }

                    var featureInfo = new FeatureInfo(
                        featureId,
                        featureName,
                        featurePriority,
                        featureCategory,
                        featureDescription,
                        pluginInfo,
                        featureDependencyIds);

                    foreach (var builder in _featureBuilderEvents)
                    {
                        builder.Built(featureInfo);
                    }

                    features.Add(featureInfo);
                }
            }
            else
            {
                var featureId = pluginInfo.Id;
                var featureName = descriptorInfo.Name;

                var featureDetails = descriptorInfo.ConfigurationRoot.GetChildren().ToDictionary(x => x.Key, v => v.Value);

                var featurePriority = featureDetails.ContainsKey(PriorityKey) ? int.Parse(featureDetails[PriorityKey]) : 0;

                var featureDependencyIds = featureDetails.ContainsKey(DependenciesKey) ?
                    featureDetails[DependenciesKey]
                        .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                        .Select(e => e.Trim())
                        .ToArray() : new string[0];

                var featureCategory = featureDetails.ContainsKey(CategoryKey) ? featureDetails[CategoryKey] : null;

                var featureDescription = featureDetails.ContainsKey(DescriptionKey) ? featureDetails[DescriptionKey] : null;

                var context = new FeatureBuildingContext
                {
                    FeatureId = featureId,
                    FeatureName = featureName,
                    Category = featureCategory,
                    Description = featureDescription,
                    PluginInfo = pluginInfo,
                    FeatureDetails = featureDetails,
                    DescriptorDetails = featureDetails,
                    DescriptorInfo = descriptorInfo,
                    Priority = featurePriority,
                    FeatureDependencyIds = featureDependencyIds
                };

                foreach (var builder in _featureBuilderEvents)
                {
                    builder.Building(context);
                }

                var featureInfo = new FeatureInfo(
                    context.FeatureId,
                    context.FeatureName,
                    context.Priority,
                    context.Category,
                    context.Description,
                    context.PluginInfo,
                    context.FeatureDependencyIds);

                foreach (var builder in _featureBuilderEvents)
                {
                    builder.Built(featureInfo);
                }

                features.Add(featureInfo);
            }

            return features;
        }
    }
}