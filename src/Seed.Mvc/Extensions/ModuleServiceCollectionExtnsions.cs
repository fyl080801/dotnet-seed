using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using Seed.Modules;
using Seed.Mvc.LocationExpanders;
using Seed.Plugins;
using System;
using System.Linq;
using Seed.Mvc.Filters;
using Newtonsoft.Json;

namespace Seed.Mvc.Extensions
{
    public static class ModuleServiceCollectionExtnsions
    {
        public static ModuleServiceCollection AddMvcModules(this ModuleServiceCollection moduleServices, IServiceProvider applicationServices)
        {
            moduleServices.Configure(services =>
            {
                services.AddMvcModules(applicationServices);
            });

            return moduleServices;
        }

        public static IServiceCollection AddMvcModules(this IServiceCollection services, IServiceProvider applicationServices)
        {
            services.TryAddSingleton(new ApplicationPartManager());

            var builder = services
                .AddAntiforgery(options =>
                {
                    options.HeaderName = "X-XSRF-TOKEN";
                })
                .AddMvcCore(options =>
                {
                    //options.Filters.Add(typeof(HandleResultAttribute));
                    //options.Filters.Add(typeof(AutoValidateAntiforgeryTokenAuthorizationFilter));
                    //options.ModelBinderProviders.Insert(0, new CheckMarkModelBinderProvider());
                })
                .AddAuthorization()
                .AddViews()
                .AddViewLocalization()
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.DateFormatHandling = DateFormatHandling.IsoDateFormat;
                })
                .AddJsonFormatters();

            AddModuleFrameworkParts(applicationServices, builder.PartManager);
            AddModuleRazorViewEngine(builder, applicationServices);
            AddMvcModuleCoreServices(services);

            return services;
        }

        internal static void AddModuleFrameworkParts(IServiceProvider services, ApplicationPartManager manager)
        {
            manager.ApplicationParts.Add(new EngineFeatureApplicationPart(services.GetRequiredService<IHttpContextAccessor>()));
        }

        internal static IMvcCoreBuilder AddModuleRazorViewEngine(this IMvcCoreBuilder builder, IServiceProvider services)
        {
            return builder.AddRazorViewEngine(options =>
            {
                options.ViewLocationExpanders.Add(new CompositeViewLocationExpanderProvider());

                var env = services.GetRequiredService<IHostingEnvironment>();

                var pluginHosts = services.GetService<IOptions<PluginExpanderOptions>>().Value.Options.Select(e => e.Path).ToArray();
                IFileProvider moduleFileProvider;
                if (env.IsDevelopment())
                {
                    moduleFileProvider = new ModuleProjectRazorFileProvider(env.ContentRootPath, pluginHosts);
                }
                else
                {
                    moduleFileProvider = new ModuleRazorFileProvider(env.ContentRootPath, pluginHosts);
                }
                options.FileProviders.Insert(0, moduleFileProvider);
            });
        }

        internal static void AddMvcModuleCoreServices(IServiceCollection services)
        {
            services.Replace(ServiceDescriptor.Scoped<IModuleTenantRouteBuilder, ModuleTenantRouteBuilder>());

            services.AddScoped<IViewLocationExpanderProvider, DefaultViewLocationExpanderProvider>();
            services.AddScoped<IViewLocationExpanderProvider, ModuleViewLocationExpanderProvider>();

            services.TryAddEnumerable(ServiceDescriptor.Transient<IApplicationModelProvider, ModuleApplicationModelProvider>());
        }
    }
}
