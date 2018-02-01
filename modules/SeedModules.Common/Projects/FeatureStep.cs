using Seed.Environment.Engine;
using Seed.Plugins;
using Seed.Project;
using Seed.Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeedModules.Common.Projects
{
    public class FeatureStep : IProjectStepHandler
    {
        private readonly IPluginManager _pluginManager;
        private readonly IEngineFeaturesManager _engineFeatureManager;

        public FeatureStep(
            IPluginManager pluginManager,
            IEngineFeaturesManager engineFeatureManager)
        {
            _pluginManager = pluginManager;
            _engineFeatureManager = engineFeatureManager;
        }

        public async Task ExecuteAsync(ProjectExecutionContext context)
        {
            if (!String.Equals(context.Name, "Feature", StringComparison.OrdinalIgnoreCase))
            {
                return;
            }

            var step = context.Step.ToObject<FeatureStepModel>();

            var features = _pluginManager.GetFeatures();

            foreach (var featureId in step.Disable)
            {
                if (features.Any(x => x.Id == featureId))
                {
                    throw new InvalidOperationException(string.Format("无法启用功能 {0}, 不存在.", featureId));
                }
            }

            foreach (var featureId in step.Enable)
            {
                if (!features.Any(x => x.Id == featureId))
                {
                    throw new InvalidOperationException(string.Format("无法启用功能 {0}, 不存在.", featureId));
                }
            }

            if (step.Disable.Any())
            {
                var featuresToDisable = features.Where(x => step.Disable.Contains(x.Id)).ToList();

                await _engineFeatureManager.DisableFeaturesAsync(featuresToDisable, true);
            }

            if (step.Enable.Any())
            {
                var featuresToEnable = features.Where(x => step.Enable.Contains(x.Id)).ToList();

                await _engineFeatureManager.EnableFeaturesAsync(featuresToEnable, true);
            }
        }
    }
}
