using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Plugin.Extensions;
using Seed.Hosting.Extensions;
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

        public static IServiceCollection AddExtensionsServices(this IServiceCollection services, IConfiguration configuration)
        {
            return AddExtensionsServices(services, configuration, null);
        }

        public static IServiceCollection AddExtensionsServices(this IServiceCollection services, IConfiguration configuration, Action<MvcOptions> mvcSetupAction)
        {
            services.AddHost(internalServices =>
            {
                internalServices.AddLogging();
                internalServices.AddOptions();
                internalServices.AddLocalization();
                internalServices.AddHostCore();
                internalServices.AddPlugins();
                //internalServices.AddCommands();
                internalServices.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            });
            services.AddPluginLocation("\\Plugins");

            services
                .AddMvcCore(options =>
                {
                    //options.Filters.Add(typeof(AutoValidateAntiforgeryTokenAuthorizationFilter));
                    //options.ModelBinderProviders.Insert(0, new CheckMarkModelBinderProvider());

                    mvcSetupAction?.Invoke(options);
                })
                .AddJsonFormatters();

            if (configuration != null)
            {
                services.AddSingleton(configuration);
            }

            services.AddSingleton(_ => services);

            return services;
        }
    }
}
