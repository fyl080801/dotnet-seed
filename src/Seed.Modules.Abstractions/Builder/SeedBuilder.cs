using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;

namespace Seed.Modules.Builder
{
    public class SeedBuilder
    {
        private Dictionary<int, StartupActions> _actions { get; } = new Dictionary<int, StartupActions>();

        public SeedBuilder(IServiceCollection services)
        {
            ApplicationServices = services;
        }

        public IServiceCollection ApplicationServices { get; }

        public SeedBuilder RegisterStartup<T>() where T : class, IStartup
        {
            ApplicationServices.AddTransient<IStartup, T>();
            return this;
        }

        public SeedBuilder ConfigureServices(Action<IServiceCollection, IServiceProvider> configure, int order = 0)
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

        public SeedBuilder ConfigureServices(Action<IServiceCollection> configure, int order = 0)
        {
            return ConfigureServices((s, sp) => configure(s), order);
        }

        public SeedBuilder Configure(Action<IApplicationBuilder, IRouteBuilder, IServiceProvider> configure, int order = 0)
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

        public SeedBuilder Configure(Action<IApplicationBuilder, IRouteBuilder> configure, int order = 0)
        {
            return Configure((app, routes, sp) => configure(app, routes), order);
        }

        public SeedBuilder Configure(Action<IApplicationBuilder> configure, int order = 0)
        {
            return Configure((app, routes, sp) => configure(app), order);
        }
    }
}
