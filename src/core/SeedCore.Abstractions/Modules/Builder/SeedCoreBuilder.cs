using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using SeedCore.Modules;
using SeedCore.Modules.Builder;
using System;
using System.Collections.Generic;

namespace Microsoft.Extensions.DependencyInjection
{
    public class SeedCoreBuilder
    {
        private Dictionary<int, StartupActions> _actions { get; } = new Dictionary<int, StartupActions>();

        public SeedCoreBuilder(IServiceCollection services)
        {
            ApplicationServices = services;
        }

        public IServiceCollection ApplicationServices { get; }

        public SeedCoreBuilder RegisterStartup<T>() where T : class, IStartup
        {
            ApplicationServices.AddTransient<IStartup, T>();
            return this;
        }

        public SeedCoreBuilder ConfigureServices(Action<IServiceCollection, IServiceProvider> configure, int order = 0)
        {
            if (!_actions.TryGetValue(order, out var actions))
            {
                actions = _actions[order] = new StartupActions(order);

                ApplicationServices.AddTransient<IStartup>(sp => new StartupActionsStartup(
                    sp.GetRequiredService<IServiceProvider>(), actions, order));
            }

            actions.ConfigureServicesActions.Add(configure);

            return this;
        }

        public SeedCoreBuilder Configure(Action<IApplicationBuilder, IRouteBuilder, IServiceProvider> configure, int order = 0)
        {
            if (!_actions.TryGetValue(order, out var actions))
            {
                actions = _actions[order] = new StartupActions(order);

                ApplicationServices.AddTransient<IStartup>(sp => new StartupActionsStartup(
                    sp.GetRequiredService<IServiceProvider>(), actions, order));
            }

            actions.ConfigureActions.Add(configure);

            return this;
        }

        public SeedCoreBuilder Configure(Action<IApplicationBuilder, IRouteBuilder> configure, int order = 0)
        {
            return Configure((app, routes, sp) => configure(app, routes), order);
        }

        public SeedCoreBuilder Configure(Action<IApplicationBuilder> configure, int order = 0)
        {
            return Configure((app, routes, sp) => configure(app), order);
        }
    }
}
