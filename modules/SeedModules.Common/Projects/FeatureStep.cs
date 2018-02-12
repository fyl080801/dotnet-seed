using Microsoft.EntityFrameworkCore;
using Seed.Data;
using Seed.Data.Migrations;
using Seed.Environment.Engine;
using Seed.Plugins;
using SeedModules.Project.Models;
using SeedModules.Project.Services;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SeedModules.Common.Projects
{
    public class FeatureStep : IProjectStepHandler
    {
        readonly IPluginManager _pluginManager;
        readonly IEngineFeaturesManager _engineFeatureManager;
        readonly IDataMigrationManager _dataMigrationManager;
        readonly IStore _store;

        public FeatureStep(
            IPluginManager pluginManager,
            IEngineFeaturesManager engineFeatureManager,
            IDataMigrationManager dataMigrationManager,
            IStore store)
        {
            _pluginManager = pluginManager;
            _engineFeatureManager = engineFeatureManager;
            _dataMigrationManager = dataMigrationManager;
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
                var featuresToDisable = features.Where(x => step.Disable.Contains(x.Id)).ToList();

                await _engineFeatureManager.DisableFeaturesAsync(featuresToDisable, true);
            }

            if (step.Enable.Any())
            {
                var featuresToEnable = features.Where(x => step.Enable.Contains(x.Id)).ToList();

                await _engineFeatureManager.EnableFeaturesAsync(featuresToEnable, true);
            }

            var enabled = await _engineFeatureManager.GetEnabledFeaturesAsync();

            await _dataMigrationManager
                .Create(_store.CreateDbContext(enabled.Select(e => e.Id)))
                .UpdateAllFeaturesAsync();
        }
    }
}
