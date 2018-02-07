using Microsoft.Extensions.DependencyInjection;
using SeedModules.AngularUI.Rendering;

namespace SeedModules.AngularUI.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddAllViewOptions(this IServiceCollection services)
        {
            services.AddScoped<IViewOptionsBuilder, AllViewOptionBuilder>();

            return services;
        }
    }
}