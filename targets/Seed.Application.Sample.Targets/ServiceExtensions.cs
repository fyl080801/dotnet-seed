using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine.Data;
using Seed.Modules.Extensions;

namespace Seed.Application.Sample.Targets
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddSeedApplication(this IServiceCollection services)
        {
            return AddSeedApplication(services, null);
        }

        public static IServiceCollection AddSeedApplication(this IServiceCollection services, IConfiguration configuration)
        {
            //services.AddThemingHost();
            //services.AddManifestDefinition("Theme.txt", "theme");
            //services.AddExtensionLocation("Themes");

            services.AddSitesFolder("App_Data", "Sites");

            //services.AddCommands();

            services.AddAuthentication();
            services.AddModules(modules =>
            {
                if (configuration != null)
                {
                    modules.WithConfiguration(configuration);
                }

                modules.WithDefaultFeatures("SeedModules.Mvc", "SeedModules.Setup");
            });

            return services;
        }
    }
}
