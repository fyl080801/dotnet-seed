using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace Seed.Extensions
{
    public interface IStartup
    {
        void ConfigureServices(IServiceCollection services);

        void Configure(IApplicationBuilder app, IServiceProvider serviceProvider);
    }
}
