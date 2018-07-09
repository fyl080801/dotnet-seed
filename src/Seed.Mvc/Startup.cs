using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.Razor.Compilation;
using Microsoft.AspNetCore.Mvc.ViewFeatures.Internal;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;
using Seed.Modules;
using Seed.Mvc.LocationExpanders;
using Seed.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Mvc
{
    public class Startup : StartupBase
    {
        public override int Order => -200;

        private readonly IServiceProvider _serviceProvider;

        public Startup(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(new ApplicationPartManager());

            var builder = services.AddMvcCore(options =>
            {
                //options.Filters.Add(typeof(AutoValidateAntiforgeryTokenAuthorizationFilter));
            });

            builder.AddAuthorization();
            // builder.AddViews();
            // builder.AddRazorViewEngine();

            builder.AddViewLocalization();

            AddModularFrameworkParts(_serviceProvider, builder.PartManager);

            builder.Services.TryAddEnumerable(
                ServiceDescriptor.Transient<IConfigureOptions<RazorViewEngineOptions>, ModularRazorViewEngineOptionsSetup>());

            builder.AddModularRazorPages();

            builder.Services.Replace(new ServiceDescriptor(typeof(IViewCompilerProvider), typeof(SharedViewCompilerProvider), ServiceLifetime.Singleton));

            AddMvcModuleCoreServices(services);
            //AddDefaultFrameworkParts(builder.PartManager);

            builder.AddJsonFormatters();
        }

        private void AddModularFrameworkParts(IServiceProvider services, ApplicationPartManager manager)
        {
            var httpContextAccessor = services.GetRequiredService<IHttpContextAccessor>();
            manager.ApplicationParts.Add(new EngineFeatureApplicationPart(httpContextAccessor));
        }

        //private static void AddDefaultFrameworkParts(ApplicationPartManager partManager)
        //{
        //    var mvcTagHelpersAssembly = typeof(InputTagHelper).Assembly;
        //    if (!partManager.ApplicationParts.OfType<AssemblyPart>().Any(p => p.Assembly == mvcTagHelpersAssembly))
        //    {
        //        partManager.ApplicationParts.Add(new AssemblyPart(mvcTagHelpersAssembly));
        //    }

        //    var mvcRazorAssembly = typeof(UrlResolutionTagHelper).Assembly;
        //    if (!partManager.ApplicationParts.OfType<AssemblyPart>().Any(p => p.Assembly == mvcRazorAssembly))
        //    {
        //        partManager.ApplicationParts.Add(new AssemblyPart(mvcRazorAssembly));
        //    }
        //}

        internal static void AddMvcModuleCoreServices(IServiceCollection services)
        {
            services.Replace(
                ServiceDescriptor.Transient<IModuleTenantRouteBuilder, ModuleTenantRouteBuilder>());

            services.AddScoped<IViewLocationExpanderProvider, DefaultViewLocationExpanderProvider>();
            services.AddScoped<IViewLocationExpanderProvider, ModuleViewLocationExpanderProvider>();

            services.TryAddEnumerable(
                ServiceDescriptor.Transient<IApplicationModelProvider, ModuleApplicationModelProvider>());
        }
    }
}
