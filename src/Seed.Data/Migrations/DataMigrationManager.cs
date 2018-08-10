using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design.Internal;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Migrations.Design;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Seed.Environment.Engine;
using Seed.Environment.Engine.Descriptor.Models;
using Seed.Environment.Plugins;
using Seed.Modules.Exceptions;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Data.Migrations
{
    public class DataMigrationManager : IDataMigrationManager
    {
        readonly IStore _store;
        readonly IPluginManager _pluginManager;
        readonly IEngineStateManager _engineStateManager;
        readonly EngineSettings _engineSettings;
        readonly EngineDescriptor _engineDescriptor;
        readonly IServiceProvider _serviceProvider;
        readonly ILogger _logger;

        public DataMigrationManager(
            IStore store,
            IPluginManager pluginManager,
            IEngineStateManager engineStateManager,
            EngineSettings engineSettings,
            EngineDescriptor engineDescriptor,
            IServiceProvider serviceProvider,
            ILogger<DataMigrationManager> logger)
        {
            _store = store;
            _pluginManager = pluginManager;
            _engineStateManager = engineStateManager;
            _engineSettings = engineSettings;
            _engineDescriptor = engineDescriptor;
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        public Task<IEnumerable<string>> GetFeaturesByUpdateAsync()
        {
            return Task.FromResult(Enumerable.Empty<string>());
        }

        public Task Uninstall(string feature)
        {
            return RunUpdateAsync();
        }

        public Task UpdateAllFeaturesAsync()
        {
            return RunUpdateAsync();
        }

        public Task UpdateAsync(string featureId)
        {
            return RunUpdateAsync();
        }

        public Task UpdateAsync(IEnumerable<string> features)
        {
            return RunUpdateAsync();
        }

        private async Task RunUpdateAsync()
        {
            await new DataMigrator(await CreateDbContext()).RunAsync();
        }

        private async Task<IDbContext> CreateDbContext()
        {
            var features = new string[0];
            try
            {
                var engineState = await _engineStateManager.GetEngineStateAsync();
                features = engineState.Features.Where(e => e.IsInstalled).Select(e => e.Id).ToArray();
            }
            catch (DbException)
            {
                features = _engineDescriptor.Features.Select(e => e.Id).ToArray();
            }

            return _store.CreateDbContext(GetFeatureTypeConfigurations(features));
        }

        private async Task<IEnumerable<object>> GetFeatureTypeConfigurations(IEnumerable<string> features)
        {
            var providers = new List<IEntityTypeConfigurationProvider>();
            var providerType = typeof(IEntityTypeConfigurationProvider);
            _pluginManager.GetFeatures(features.ToArray())
                .Select(e => e.Plugin)
                .Distinct()
                .Select(e =>
                {
                    return _pluginManager.LoadPluginAsync(e).Result.ExportedTypes
                        .Where(pro => providerType.IsAssignableFrom(pro))
                        .Select(pro => ActivatorUtilities.GetServiceOrCreateInstance(_serviceProvider, pro) as IEntityTypeConfigurationProvider)
                        .ToList();
                })
                .ToList()
                .ForEach(list =>
                {
                    providers = providers.Concat(list).ToList();
                });

            return await providers.Distinct().InvokeAsync(e => e.GetEntityTypeConfigurationsAsync(), _logger);
        }
    }
}