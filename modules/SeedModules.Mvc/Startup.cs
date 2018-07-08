using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Seed.Modules;
using Seed.Modules.Extensions;
using Seed.Mvc.Extensions;
using Seed.Security.Permissions;
using System;

namespace SeedModules.Mvc
{
    public class Startup : StartupBase
    {
        public override int Order => -200;

        readonly IServiceProvider _applicationServices;

        public Startup(IServiceProvider applicationServices)
        {
            _applicationServices = applicationServices;
        }

        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(_applicationServices);

            services.AddScoped<IPermissionProvider, Permissions>();
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            //app.ConfigureModules(e =>
            //{
            //    e.UseStaticFilesModules();
            //});
        }
    }
}
