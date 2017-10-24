using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.ViewFeatures.Internal;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Seed.Modules;
using Seed.Mvc.LocationExpanders;
using System;

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
                .AddMvcCore(options =>
                {
                    options.Filters.Add(typeof(AutoValidateAntiforgeryTokenAuthorizationFilter));
                    //    options.ModelBinderProviders.Insert(0, new CheckMarkModelBinderProvider());
                })
                .AddAuthorization()
                .AddViews()
                .AddJsonFormatters();

            AddModuleFrameworkParts(applicationServices, builder.PartManager);

            AddModuleViewEngine(builder, applicationServices);

            AddMvcModuleCoreServices(services);

            return services;
        }

        internal static void AddModuleFrameworkParts(IServiceProvider services, ApplicationPartManager manager)
        {
            manager.ApplicationParts.Add(new EngineFeatureApplicationPart(services.GetRequiredService<IHttpContextAccessor>()));
        }

        internal static IMvcCoreBuilder AddModuleViewEngine(this IMvcCoreBuilder builder, IServiceProvider services)
        {
            return builder.AddRazorViewEngine(options =>
            {
                options.ViewLocationExpanders.Add(new CompositeViewLocationExpanderProvider());

                //var env = services.GetRequiredService<IHostingEnvironment>();

                //if (env.IsDevelopment())
                //{
                //    options.FileProviders.Insert(0, new ModuleProjectRazorFileProvider(env.ContentRootPath));
                //}
            });
        }

        internal static void AddMvcModuleCoreServices(IServiceCollection services)
        {
            services.Replace(ServiceDescriptor.Scoped<IModuleLauncherRouteBuilder, ModuleLauncherRouteBuilder>());

            services.AddScoped<IViewLocationExpanderProvider, DefaultViewLocationExpanderProvider>();
            services.AddScoped<IViewLocationExpanderProvider, ModuleViewLocationExpanderProvider>();

            services.TryAddEnumerable(ServiceDescriptor.Transient<IApplicationModelProvider, ModuleApplicationModelProvider>());
        }
    }
}
