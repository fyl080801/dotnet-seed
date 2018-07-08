using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Seed.Application.All.Targets;
using Seed.Modules.Extensions;

namespace Seed
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSeedApplication();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            app.UseSeedApplication();
        }
    }
}
