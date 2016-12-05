using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Seed.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Hosting
{
    public static class HostServiceExtensions
    {
        public static IServiceCollection AddHostServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<DefaultHost>();
            services.AddSingleton<IHost>(sp => sp.GetRequiredService<DefaultHost>());
            services.AddPlugins(configuration);
            return services;
        }
    }
}
