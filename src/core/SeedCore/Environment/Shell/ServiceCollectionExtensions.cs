using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;
using SeedCore.Environment.Shell.Builders;
using SeedCore.Environment.Shell.Descriptor;
using SeedCore.Environment.Shell.Descriptor.Models;
using SeedCore.Environment.Shell.Descriptor.Settings;

namespace SeedCore.Environment.Shell
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddHostingShellServices(this IServiceCollection services)
        {
            // Register the type as it's implementing two interfaces which can be resolved independently
            services.AddSingleton<ShellHost>();
            services.AddSingleton<IShellHost>(sp => sp.GetRequiredService<ShellHost>());
            services.AddSingleton<IShellDescriptorManagerEventHandler>(sp => sp.GetRequiredService<ShellHost>());

            {
                // Use a single default site by default, i.e. if WithTenants hasn't been called before
                services.TryAddSingleton<IShellSettingsManager, SingleShellSettingsManager>();
                services.AddTransient<IConfigureOptions<ShellOptions>, ShellOptionsSetup>();

                services.AddSingleton<IShellContextFactory, ShellContextFactory>();
                {
                    services.AddSingleton<ICompositionStrategy, CompositionStrategy>();

                    services.AddSingleton<IShellContainerFactory, ShellContainerFactory>();
                }
            }

            services.AddSingleton<IRunningShellTable, RunningShellTable>();

            return services;
        }

        public static IServiceCollection AddAllFeaturesDescriptor(this IServiceCollection services)
        {
            services.AddScoped<IShellDescriptorManager, AllFeaturesShellDescriptorManager>();

            return services;
        }

        public static IServiceCollection AddSetFeaturesDescriptor(this IServiceCollection services)
        {
            services.AddSingleton<IShellDescriptorManager>(sp =>
            {
                var shellFeatures = sp.GetServices<ShellFeature>();
                return new SetFeaturesShellDescriptorManager(shellFeatures);
            });

            return services;
        }
    }
}