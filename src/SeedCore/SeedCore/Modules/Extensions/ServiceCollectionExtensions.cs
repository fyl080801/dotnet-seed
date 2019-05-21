using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using SeedCore;
using SeedCore.Addon;
using SeedCore.Localization;
using SeedCore.Modules;
using SeedCore.Modules.Services;
using SeedCore.Shell;
using SeedCore.Shell.Configuration;
using SeedCore.Shell.Descriptor.Models;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static SeedCoreBuilder AddSeedCore(this IServiceCollection services)
        {
            var builder = services
                .LastOrDefault(d => d.ServiceType == typeof(SeedCoreBuilder))?
                .ImplementationInstance as SeedCoreBuilder;

            if (builder == null)
            {
                builder = new SeedCoreBuilder(services);
                services.AddSingleton(builder);

                AddDefaultServices(services);
                AddShellServices(services);
                AddExtensionServices(builder);
                AddStaticFiles(builder);

                AddAntiForgery(builder);
                AddAuthentication(builder);
                AddDataProtection(builder);

                // Register the list of services to be resolved later on
                services.AddSingleton(services);
            }

            return builder;
        }

        private static void AddDefaultServices(IServiceCollection services)
        {
            services.AddLogging();
            services.AddOptions();

            // These services might be moved at a higher level if no components from SeedCore needs them.
            services.AddLocalization();

            // For performance, prevents the 'ResourceManagerStringLocalizer' from being used.
            services.AddSingleton<IStringLocalizerFactory, NullStringLocalizerFactory>();

            services.AddWebEncoders();

            // ModularTenantRouterMiddleware which is configured with UseSeedCore() calls UseRouter() which requires the routing services to be
            // registered. This is also called by AddMvcCore() but some applications that do not enlist into MVC will need it too.
            services.AddRouting();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IClock, Clock>();
            services.AddScoped<ILocalClock, LocalClock>();

            services.AddSingleton<IPoweredByMiddlewareOptions, PoweredByMiddlewareOptions>();
            services.AddTransient<IModularTenantRouteBuilder, ModularTenantRouteBuilder>();

            services.AddScoped<ISeedHelper, DefaultSeedHelper>();
        }

        private static void AddShellServices(IServiceCollection services)
        {
            // Use a single tenant and all features by default
            services.AddHostingShellServices();
            services.AddAllFeaturesDescriptor();

            // Registers the application main feature
            services.AddTransient(sp => new ShellFeature
            (
                sp.GetRequiredService<IHostingEnvironment>().ApplicationName, alwaysEnabled: true)
            );
        }

        private static void AddExtensionServices(SeedCoreBuilder builder)
        {
            builder.ApplicationServices.AddSingleton<IModuleNamesProvider, AssemblyAttributeModuleNamesProvider>();
            builder.ApplicationServices.AddSingleton<IApplicationContext, ModularApplicationContext>();

            builder.ApplicationServices.AddExtensionManagerHost();

            builder.ConfigureServices(services =>
            {
                services.AddExtensionManager();
            });
        }

        /// <summary>
        /// Adds tenant level configuration to serve static files from modules
        /// </summary>
        private static void AddStaticFiles(SeedCoreBuilder builder)
        {
            builder.Configure((app, routes, serviceProvider) =>
            {
                var env = serviceProvider.GetRequiredService<IHostingEnvironment>();
                var appContext = serviceProvider.GetRequiredService<IApplicationContext>();

                IFileProvider fileProvider;
                if (env.IsDevelopment())
                {
                    var fileProviders = new List<IFileProvider>();
                    fileProviders.Add(new ModuleProjectStaticFileProvider(appContext));
                    fileProviders.Add(new ModuleEmbeddedStaticFileProvider(appContext));
                    fileProvider = new CompositeFileProvider(fileProviders);
                }
                else
                {
                    fileProvider = new ModuleEmbeddedStaticFileProvider(appContext);
                }

                var options = serviceProvider.GetRequiredService<IOptions<StaticFileOptions>>().Value;

                options.RequestPath = "";
                options.FileProvider = fileProvider;

                var shellConfiguration = serviceProvider.GetRequiredService<IShellConfiguration>();

                var cacheControl = shellConfiguration.GetValue("StaticFileOptions:CacheControl", "public, max-age=2592000, s-max-age=31557600");

                // Cache static files for a year as they are coming from embedded resources and should not vary
                options.OnPrepareResponse = ctx =>
                {
                    ctx.Context.Response.Headers[HeaderNames.CacheControl] = cacheControl;
                };

                app.UseStaticFiles(options);
            });
        }

        /// <summary>
        /// 租户级别 antiforgery
        /// </summary>
        private static void AddAntiForgery(SeedCoreBuilder builder)
        {
            builder.ApplicationServices.AddAntiforgery();

            builder.ConfigureServices((services, serviceProvider) =>
            {
                var settings = serviceProvider.GetRequiredService<ShellSettings>();

                var tenantName = settings.Name;

                // Re-register the antiforgery  services to be tenant-aware.
                var collection = new ServiceCollection()
                    .AddAntiforgery(options =>
                    {
                        options.Cookie.Name = "seed_antiforgery_" + tenantName;

                        // Don't set the cookie builder 'Path' so that it uses the 'IAuthenticationFeature' value
                        // set by the pipeline and comming from the request 'PathBase' which already ends with the
                        // tenant prefix but may also start by a path related e.g to a virtual folder.
                    });

                services.Add(collection);
            });
        }

        /// <summary>
        /// 租户级别的授权
        /// </summary>
        private static void AddAuthentication(SeedCoreBuilder builder)
        {
            builder.ApplicationServices.AddAuthentication();

            builder.ConfigureServices(services =>
            {
                services.AddAuthentication();

                // IAuthenticationSchemeProvider is already registered at the host level.
                // We need to register it again so it is taken into account at the tenant level
                // because it holds a reference to an underlying dictionary, responsible of storing 
                // the registered schemes which need to be distinct for each tenant.
                services.AddSingleton<IAuthenticationSchemeProvider, AuthenticationSchemeProvider>();

            })
            .Configure(app =>
            {
                app.UseAuthentication();
            });
        }

        /// <summary>
        /// 租户级别数据保护机制
        /// </summary>
        private static void AddDataProtection(SeedCoreBuilder builder)
        {
            builder.ConfigureServices((services, serviceProvider) =>
            {
                var settings = serviceProvider.GetRequiredService<ShellSettings>();
                var options = serviceProvider.GetRequiredService<IOptions<ShellOptions>>();

                var directory = Directory.CreateDirectory(Path.Combine(
                    options.Value.ShellsApplicationDataPath,
                    options.Value.ShellsContainerName,
                    settings.Name, "DataProtection-Keys"));

                // Re-register the data protection services to be tenant-aware so that modules that internally
                // rely on IDataProtector/IDataProtectionProvider automatically get an isolated instance that
                // manages its own key ring and doesn't allow decrypting payloads encrypted by another tenant.
                // By default, the key ring is stored in the tenant directory of the configured App_Data path.
                var collection = new ServiceCollection()
                    .AddDataProtection()
                    .PersistKeysToFileSystem(directory)
                    .SetApplicationName(settings.Name)
                    .Services;

                // Retrieve the implementation type of the newly startup filter registered as a singleton
                var startupFilterType = collection.FirstOrDefault(s => s.ServiceType == typeof(IStartupFilter))?.ImplementationType;

                if (startupFilterType != null)
                {
                    // Remove any previously registered data protection startup filters.
                    var descriptors = services.Where(s => s.ServiceType == typeof(IStartupFilter) &&
                        (s.ImplementationInstance?.GetType() == startupFilterType ||
                        s.ImplementationType == startupFilterType)).ToArray();

                    foreach (var descriptor in descriptors)
                    {
                        services.Remove(descriptor);
                    }
                }

                // Remove any previously registered options setups.
                services.RemoveAll<IConfigureOptions<KeyManagementOptions>>();
                services.RemoveAll<IConfigureOptions<DataProtectionOptions>>();

                services.Add(collection);
            });
        }
    }
}
