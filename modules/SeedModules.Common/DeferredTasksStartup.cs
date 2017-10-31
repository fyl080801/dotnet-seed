using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Seed.Modules;
using Seed.Modules.Extensions;
using System;

namespace SeedModules.Common
{
    public class DeferredTasksStartup : StartupBase
    {
        public override int Order => -40;

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            app.UseDeferredTasks();
        }
    }
}
