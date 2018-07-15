using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Modules
{
    public interface IStartup
    {
        /// <summary>
        /// 
        /// </summary>
        /// <value></value>
        int Order { get; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="services"></param>
        void ConfigureServices(IServiceCollection services);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="builder"></param>
        /// <param name="routes"></param>
        /// <param name="serviceProvider"></param>
        void Configure(IApplicationBuilder builder, IRouteBuilder routes, IServiceProvider serviceProvider);
    }
}
