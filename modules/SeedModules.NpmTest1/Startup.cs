using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Seed.Modules;
using Seed.Modules.Extensions;

namespace SeedModules.NpmTest1
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddSeedSpaStaticFiles(config =>
            {
                config.RootPath = "build";
            });
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            app.UseSeedSpa(new SeedSpaOptions
            {
                SpaType = "react"
            });
        }
    }
}
