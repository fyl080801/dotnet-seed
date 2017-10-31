using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Seed.Modules.DeferredTasks;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Modules.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDeferredTasks(this IServiceCollection services)
        {
            services.TryAddScoped<IDeferredTaskEngine, DeferredTaskEngine>();
            services.TryAddScoped<IDeferredTaskState, HttpContextTaskState>();
            return services;
        }
    }
}
