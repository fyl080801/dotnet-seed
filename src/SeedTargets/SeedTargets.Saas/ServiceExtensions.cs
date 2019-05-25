using System;
using System.Collections.Generic;
using System.Text;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddSeed(this IServiceCollection services)
        {
            return AddSeed(services, null);
        }

        public static IServiceCollection AddSeed(this IServiceCollection services, Action<SeedCoreBuilder> configure)
        {
            var builder = services.AddSeedCore()

                // .AddCommands()

                .AddMvc()

                .AddSetupFeatures("SeedModules.Setup")

                .AddDataAccess()
                .AddDataStorage()
                .AddBackgroundService()
                .AddDeferredTasks()

                // .AddTheming()
                // .AddLiquidViews()
                .AddCaching();

            //builder.ConfigureServices(s =>
            //{
            //    s.AddResourceManagement();

            //    s.AddTagHelpers<LinkTagHelper>();
            //    s.AddTagHelpers<MetaTagHelper>();
            //    s.AddTagHelpers<ResourcesTagHelper>();
            //    s.AddTagHelpers<ScriptTagHelper>();
            //    s.AddTagHelpers<StyleTagHelper>();
            //});

            // 是否在这里单独use？
            // builder.Configure(app => app.UseDataAccess());

            configure?.Invoke(builder);

            return services;
        }
    }
}
