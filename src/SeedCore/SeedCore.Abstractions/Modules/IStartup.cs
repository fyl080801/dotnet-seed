using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace SeedCore.Modules
{
    public interface IStartup
    {
        int Order { get; }

        void ConfigureServices(IServiceCollection services);

        void Configure(IApplicationBuilder builder, IRouteBuilder routes, IServiceProvider serviceProvider);
    }
}
