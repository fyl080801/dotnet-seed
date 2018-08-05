using Seed.Data;
using Seed.Environment.Engine;
using Seed.Environment.Plugins;
using Seed.Project.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Project.Steps
{
    public class FeatureStep : IProjectStepHandler
    {
        readonly IPluginManager _pluginManager;
        readonly IEngineFeaturesManager _engineFeatureManager;
        readonly IStore _store;

        public FeatureStep(
            IPluginManager pluginManager,
            IEngineFeaturesManager engineFeatureManager,
            IStore store)
        {
            _pluginManager = pluginManager;
            _engineFeatureManager = engineFeatureManager;
            _store = store;
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
                await _engineFeatureManager.DisableFeaturesAsync(features.Where(x => step.Disable.Contains(x.Id)).ToList(), true);
            }

            if (step.Enable.Any())
            {
                await _engineFeatureManager.EnableFeaturesAsync(features.Where(x => step.Enable.Contains(x.Id)).ToList(), true);
            }
        }
    }
}
