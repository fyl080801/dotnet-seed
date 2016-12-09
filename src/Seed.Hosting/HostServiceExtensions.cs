using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Hosting
{
    public static class HostServiceExtensions
    {
        public static IServiceCollection AddHost(this IServiceCollection services, Action<IServiceCollection> additionalDependencies)
        {
            additionalDependencies(services);
            return services;
        }

        public static IServiceCollection AddHostCore(this IServiceCollection services)
        {
            services.AddSingleton<DefaultHost>();
            services.AddSingleton<IHost>(sp => sp.GetRequiredService<DefaultHost>());
            return services;
        }
    }
}
