using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace Seed.Extensions
{
    public abstract class StartupBase : IStartup
    {
        public virtual void Configure(IApplicationBuilder app, IServiceProvider serviceProvider)
        {

        }

        public virtual void ConfigureServices(IServiceCollection services)
        {

        }
    }
}
