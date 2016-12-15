using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine.Extensions;
using Seed.Environment.Plugin.Extensions;
using Seed.Hosting.Extensions;
using Seed.Mvc.Razor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Mvc.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddExtensionsServices(this IServiceCollection services)
        {
            return AddExtensionsServices(services, null);
        }

        public static IServiceCollection AddExtensionsServices(this IServiceCollection services,
            IConfiguration configuration)
        {
            return AddExtensionsServices(services, configuration, null);
        }

        public static IServiceCollection AddExtensionsServices(this IServiceCollection services,
            IConfiguration configuration, Action<MvcOptions> mvcSetupAction)
        {
            services.AddWebHost();
            services.AddPluginLocation(configuration);

            services.AddMvc(mvcSetupAction)
                .AddViews()
                .AddViewLocalization()
                .AddRazorViewEngine()
                .AddJsonFormatters();

            services.Configure<RazorViewEngineOptions>(options =>
            {
                options.ViewLocationExpanders.Add(new PluginViewLocationExpander());

                //var extensionLibraryService = services.BuildServiceProvider().GetService<IExtensionLibraryService>();
                //((List<MetadataReference>)options.AdditionalCompilationReferences).AddRange(extensionLibraryService.MetadataReferences());
            });

            if (configuration != null)
            {
                services.AddSingleton(configuration);
            }

            services.AddSingleton(_ => services);

            return services;
        }

        public static IServiceCollection WithAllPlugins(this IServiceCollection services)
        {
            return services.AddAllPluginDescriptor();
        }

        public static IMvcCoreBuilder AddMvc(this IServiceCollection services,
            Action<MvcOptions> mvcSetupAction)
        {
            return services.AddMvcCore(options =>
            {
                //options.Filters.Add();
                //options.ModelBinderProviders.Add()/Insert()
                mvcSetupAction?.Invoke(options);
            });
        }

        public static IServiceCollection AddWebHost(this IServiceCollection services)
        {
            return services.AddHost(internalServices =>
            {
                internalServices.AddLogging();
                internalServices.AddOptions();
                internalServices.AddLocalization();
                internalServices.AddHostCore();
                internalServices.AddPlugins();
                //internalServices.AddCommands();
                internalServices.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            });
        }
    }
}
