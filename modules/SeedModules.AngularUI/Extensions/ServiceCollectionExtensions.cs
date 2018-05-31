using Microsoft.Extensions.DependencyInjection;
using SeedModules.AngularUI.Rendering;

namespace SeedModules.AngularUI.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddViewOptions<T>(this IServiceCollection services)
            where T : class, IViewOptionsBuilder
        {
            services.AddScoped<IViewOptionLoader, ViewOptionLoader>();
            services.AddScoped<IViewOptionsBuilder, T>();

            return services;
        }

        public static IServiceCollection AddAllViewOptions(this IServiceCollection services)
        {
            services.AddScoped<IViewOptionLoader, ViewOptionLoader>();
            services.AddScoped<IViewOptionsBuilder, AllViewOptionBuilder>();

            return services;
        }
    }
}