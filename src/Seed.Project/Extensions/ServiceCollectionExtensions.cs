using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Project.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddProject(this IServiceCollection services)
        {
            services.AddScoped<IProjectHarvester, ApplicationProjectHarvester>();
            services.AddScoped<IProjectHarvester, ProjectHarvester>();
            services.AddScoped<IProjectExecutor, ProjectExecutor>();

            return services;
        }
    }
}
