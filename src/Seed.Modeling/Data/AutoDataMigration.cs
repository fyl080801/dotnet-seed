using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine;
using Seed.Modules;
using System;
using System.Threading.Tasks;

namespace Seed.Data
{
    public class AutoDataMigration : IModuleLauncherEvents
    {
        readonly EngineSettings _engineSettings;
        readonly IServiceProvider _serviceProvider;

        public AutoDataMigration(EngineSettings engineSettings, IServiceProvider serviceProvider)
        {
            _engineSettings = engineSettings;
            _serviceProvider = serviceProvider;
        }

        public Task ActivatedAsync()
        {
            if (_engineSettings.State != LauncherStates.Uninitialized)
            {
                return _serviceProvider.GetService<IDataMigrationManager>().UpdateAllFeaturesAsync();
            }
            return Task.CompletedTask;
        }

        public Task ActivatingAsync()
        {
            return Task.CompletedTask;
        }

        public Task TerminatedAsync()
        {
            return Task.CompletedTask;
        }

        public Task TerminatingAsync()
        {
            return Task.CompletedTask;
        }
    }
}
