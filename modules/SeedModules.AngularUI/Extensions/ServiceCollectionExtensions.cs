using Microsoft.Extensions.DependencyInjection;
using SeedModules.AngularUI.Rendering;

namespace SeedModules.AngularUI.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddOptionBuilder(this IServiceCollection services)
        {
            services.AddScoped<IUIOptionsBuilder, UIOptionBuilder>();

            return services;
        }
    }
}