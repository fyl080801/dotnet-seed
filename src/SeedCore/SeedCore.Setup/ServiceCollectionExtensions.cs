using SeedCore.Setup;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSetup(this IServiceCollection services)
        {
            services.AddScoped<ISetupService, SetupService>();

            return services;
        }
    }
}
