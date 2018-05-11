using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Seed.Data;
using Seed.Modules;
using SeedModules.IdentityServer.Internals.Extensions;
using System;

namespace SeedModules.IdentityServer
{
    public class Startup : StartupBase
    {
        readonly IHostingEnvironment _env;

        public Startup(IHostingEnvironment env)
        {
            _env = env;
        }

        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IEntityTypeConfigurationProvider, EntityTypeConfigurations>();
            services.AddSeedIdentityServices(_env);
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            app.UseSeedIdentityServer();
        }
    }
}
