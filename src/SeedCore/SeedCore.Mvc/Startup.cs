using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.Razor.Compilation;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;
using SeedCore.Modules;
using SeedCore.Mvc.LocationExpander;
using SeedCore.Mvc.ModelBinding;
using SeedCore.Mvc.RazorPages;
using System;

namespace SeedCore.Mvc
{
    public class Startup : StartupBase
    {
        readonly static IMemoryCache _cache = new MemoryCache(new MemoryCacheOptions());
        readonly IServiceProvider _serviceProvider;

        public override int Order => -100;

        public Startup(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(new ApplicationPartManager());

            var builder = services.AddMvc(options =>
            {
                options.Filters.Add(typeof(AutoValidateAntiforgeryTokenAttribute));
                options.ModelBinderProviders.Insert(0, new CheckMarkModelBinderProvider());
            });

            builder.SetCompatibilityVersion(CompatibilityVersion.Latest);

            services.AddModularRazorPages();
            // AddModularFrameworkParts(_serviceProvider, builder.PartManager);

            builder.AddViewLocalization();
            builder.AddDataAnnotationsLocalization();

            services.TryAddEnumerable(
                ServiceDescriptor.Transient<IConfigureOptions<RazorViewEngineOptions>, ModularRazorViewEngineOptionsSetup>());

            services.AddSingleton<IViewCompilationMemoryCacheProvider>(new RazorViewCompilationMemoryCacheProvider());

            AddMvcModuleCoreServices(services);
        }

        internal static void AddMvcModuleCoreServices(IServiceCollection services)
        {
            services.Replace(
                ServiceDescriptor.Transient<IModularTenantRouteBuilder, ModularTenantRouteBuilder>());

            services.AddScoped<IViewLocationExpanderProvider, ComponentViewLocationExpanderProvider>();

            services.TryAddEnumerable(
                ServiceDescriptor.Singleton<IApplicationModelProvider, ModularApplicationModelProvider>());
        }

        internal class RazorViewCompilationMemoryCacheProvider : IViewCompilationMemoryCacheProvider
        {
            public IMemoryCache CompilationMemoryCache { get; } = _cache;
        }
    }
}
