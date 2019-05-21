using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;

namespace SeedCore.Mvc.RazorPages
{
    public static class ModularPageMvcCoreBuilderExtensions
    {
        public static IMvcCoreBuilder AddModularRazorPages(this IMvcCoreBuilder builder)
        {
            builder.AddRazorPages();
            builder.Services.AddModularRazorPages();
            return builder;
        }

        internal static IServiceCollection AddModularRazorPages(this IServiceCollection services)
        {
            services.TryAddEnumerable(
                ServiceDescriptor.Transient<IConfigureOptions<RazorPagesOptions>, ModularPageRazorPagesOptionsSetup>());

            services.TryAddEnumerable(
                ServiceDescriptor.Singleton<IPageApplicationModelProvider, ModularPageApplicationModelProvider>());

            return services;
        }
    }
}