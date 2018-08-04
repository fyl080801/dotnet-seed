using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine;
using Seed.Modules;
using Seed.Modules.Setup.Events;
using Seed.Mvc.Settings;
using Seed.Project.Extensions;
using SeedModules.Admin.Extensions;
using SeedModules.Admin.Projects;
using SeedModules.Admin.Rendering;
using SeedModules.Admin.Services;
using SeedModules.AngularUI.Rendering;
using System;

namespace SeedModules.Admin
{
    public class Startup : StartupBase
    {
        readonly string _tenantName;
        readonly string _prefix;

        public Startup(EngineSettings engineSettings)
        {
            _tenantName = engineSettings.Name;
            _prefix = "/" + engineSettings.RequestUrlPrefix;
        }

        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<ISetupEventHandler, SetupEventHandler>();
            services.AddSingleton<ISiteService, SiteService>();
            services.AddProjectExecutionStep<SettingsStep>();

            services.AddRoleServices();
            services.AddAuthenticationServices(_tenantName, _prefix);
            services.AddScoped<ISiteSettingsBuilder, SiteSettingsBuilder>();
            //services.AddScoped<IRouteReferenceProvider, RouteReferences>();
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            app.UseAuthentication();
        }
    }
}
