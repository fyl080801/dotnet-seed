using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Engine.Extensions
{
    public static class EngineServiceCollectionExtensions
    {
        public static IServiceCollection AddHostingEngineServices(this IServiceCollection services)
        {
            services.AddSingleton<EngineHost>();
            services.AddSingleton<IEngineHost>(e => e.GetRequiredService<EngineHost>());
            services.AddSingleton<IEngineDescriptorManagerEventHandler>(sp => sp.GetRequiredService<EngineHost>());

            //
            services.TryAddSingleton<IEngineSettingsManager, SingleEngineSettingsManager>();
            services.AddSingleton<IEngineContextFactory, EngineContextFactory>();
            services.AddSingleton<ICompositionStrategy, CompositionStrategy>();
            services.AddSingleton<IEngineContainerFactory, EngineContainerFactory>();
            services.AddSingleton<IRunningEngineTable, RunningEngineTable>();

            return services;
        }
    }
}
