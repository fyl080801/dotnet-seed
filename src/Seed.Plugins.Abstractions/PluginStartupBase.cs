using Seed.Modules.Abstractions;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;

namespace Seed.Plugins.Abstractions
{
    public abstract class PluginStartupBase : IStartup
    {
        public int Order => 0;

        public virtual void Configure(IApplicationBuilder builder, IRouteBuilder routes, IServiceProvider serviceProvider)
        {

        }

        public virtual void ConfigureServices(IServiceCollection services)
        {

        }
    }
}
