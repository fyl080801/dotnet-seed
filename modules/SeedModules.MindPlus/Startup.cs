using System;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Seed.Data;
using Seed.Environment.Engine;
using Seed.Modules;
using SeedModules.AngularUI.Rendering;
using SeedModules.MindPlus.Extensions;

namespace SeedModules.MindPlus
{
    public class Startup : StartupBase
    {
        readonly string _tenantName;
        readonly string _prefix;
        readonly IDataProtectionProvider _dataProtectionProvider;

        public Startup(EngineSettings engineSettings, IDataProtectionProvider dataProtectionProvider)
        {
            _tenantName = engineSettings.Name;
            _prefix = "/" + engineSettings.RequestUrlPrefix;
            _dataProtectionProvider = dataProtectionProvider.CreateProtector(_tenantName);
        }

        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IRouteReferenceProvider, RouteReferences>();
            services.AddScoped<IEntityTypeConfigurationProvider, EntityTypeConfigurations>();
            services.AddMindAuthenticationServices(_dataProtectionProvider, _tenantName, _prefix);
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {

        }
    }
}
