using Microsoft.Extensions.DependencyInjection;
using Seed.Project.Abstractions;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Project.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddProject(this IServiceCollection services)
        {
            //services.AddScoped<IRecipeHarvester, ApplicationRecipeHarvester>();
            //services.AddScoped<IRecipeHarvester, RecipeHarvester>();
            services.AddScoped<IProjectExecutor, ProjectExecutor>();

            return services;
        }
    }
}
