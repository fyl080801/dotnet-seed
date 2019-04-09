using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.StaticFiles;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using Seed.Environment.Engine;
using Seed.Environment.Engine.Descriptor.Models;
using Seed.Environment.Plugins;
using Seed.Modules.Builder;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;

namespace Seed.Modules.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static SeedBuilder AddSeed(this IServiceCollection services)
        {
            var builder = services
                .LastOrDefault(d => d.ServiceType == typeof(SeedBuilder))?
                .ImplementationInstance as SeedBuilder;

            if (builder == null)
            {
                builder = new SeedBuilder(services);
                services.AddSingleton(builder);

                AddDefaultServices(services);
                AddEngineServices(services);
                AddPluginServices(builder);
                AddStaticFiles(builder);
                AddAntiForgery(builder);
                AddAuthentication(builder);
                AddDataProtection(builder);

                services.AddSingleton(services);
            }

            return builder;
        }

        public static IServiceCollection AddModuleStaticFile(this IServiceCollection services, string path)
        {
            var callerName = Assembly.GetCallingAssembly().GetName().Name;
            services.AddSingleton<ISeedFileProvider>(sp => new ModuleInnerFileProvider(sp.GetService<IHostingEnvironment>(), callerName, path));
            return services;
        }

        public static IServiceCollection AddSeedSpa(this IServiceCollection services, Action<SpaStaticFilesOptions> configuration = null)
        {
            // 实现一个嵌入资源的单页应用provider
            services.AddSingleton<ISpaStaticFileProvider>(serviceProvider =>
            {
                var optionsProvider = serviceProvider.GetService<IOptions<SpaStaticFilesOptions>>();
                var options = optionsProvider.Value;

                configuration?.Invoke(options);

                if (string.IsNullOrEmpty(options.RootPath))
                {
                    throw new InvalidOperationException($"没有 {nameof(SpaStaticFilesOptions.RootPath)} " +
                        $"被设置在 {nameof(SpaStaticFilesOptions)}.");
                }

                return new ModuleSpaStaticFileProvider(serviceProvider, options);
            });
            return services;
        }

        private static void AddDefaultServices(IServiceCollection services)
        {
            services.AddLogging();
            services.AddOptions();
            services.AddLocalization();
            services.AddWebEncoders();
            services.AddRouting();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            //services.AddSingleton<IClock, Clock>();
            //services.AddScoped<ILocalClock, LocalClock>();
            services.AddTransient<IModuleTenantRouteBuilder, ModuleTenantRouteBuilder>();
        }

        private static void AddEngineServices(IServiceCollection services)
        {
            services.AddHostingEngineServices();
            services.AddAllFeaturesDescriptor();

            services.AddTransient(sp => new EngineFeature
            (
                sp.GetRequiredService<IHostingEnvironment>().ApplicationName, alwaysEnabled: true)
            );
        }

        private static void AddPluginServices(SeedBuilder builder)
        {
            builder.ApplicationServices.AddPluginManagerHost();

            builder.ConfigureServices(services =>
            {
                services.AddPluginManager();
            });
        }

        private static void AddStaticFiles(SeedBuilder builder)
        {
            builder.Configure((app, routes, serviceProvider) =>
            {
                var env = serviceProvider.GetRequiredService<IHostingEnvironment>();

                var seedProviders = serviceProvider.GetServices<ISeedFileProvider>();
                var fileProviders = new List<IFileProvider>
                {
                    new ModuleEmbeddedStaticFileProvider(env)
                }
                .Concat(seedProviders)
                .ToList();

                // 开发环境下需要直接读取模块目录下的文件
                if (env.IsDevelopment())
                {
                    fileProviders.Insert(0, new ModuleProjectStaticFileProvider(env));
                }

                app.UseStaticFiles(new StaticFileOptions
                {
                    RequestPath = "",
                    FileProvider = new CompositeFileProvider(fileProviders)
                });
            });
        }

        private static void AddTenantCookie(SeedBuilder builder)
        {
            builder.ConfigureServices((service, serviceProvider) =>
            {

            });
        }

        private static void AddAntiForgery(SeedBuilder builder)
        {
            //builder.ApplicationServices.AddAntiforgery();

            builder.ConfigureServices((services, serviceProvider) =>
            {
                var settings = serviceProvider.GetRequiredService<EngineSettings>();

                var tenantName = settings.Name;
                var tenantPrefix = "/" + settings.RequestUrlPrefix;

                services.AddAntiforgery(options =>
                {
                    options.HeaderName = "X-XSRF-TOKEN";
                    options.Cookie.Name = "seedforgery_" + tenantName;
                    options.Cookie.Path = tenantPrefix;
                });
            });
        }

        private static void AddAuthentication(SeedBuilder builder)
        {
            builder.ApplicationServices.AddAuthentication();

            builder.ConfigureServices(services =>
            {
                services.AddAuthentication();
                services.AddSingleton<IAuthenticationSchemeProvider, AuthenticationSchemeProvider>();
            })
            .Configure(app =>
            {
                app.UseAuthentication();
            });
        }

        private static void AddDataProtection(SeedBuilder builder)
        {
            builder.ConfigureServices((services, serviceProvider) =>
            {
                var settings = serviceProvider.GetRequiredService<EngineSettings>();
                var options = serviceProvider.GetRequiredService<IOptions<EngineOptions>>();

                var directory = Directory.CreateDirectory(Path.Combine(
                options.Value.ApplicationDataPath,
                options.Value.ContainerName,
                settings.Name, "DataProtection-Keys"));

                services.Add(new ServiceCollection()
                    .AddDataProtection()
                    .PersistKeysToFileSystem(directory)
                    .SetApplicationName(settings.Name)
                    .Services);
            });
        }
    }
}
