using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.Extensions.DependencyInjection;
using SeedModules.PageBuilder.Internals;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.PageBuilder.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDynamicBusiness(this IServiceCollection services)
        {
            services.AddOData();
            services.AddScoped<MetadataController>();

            return services;
        }
    }
}
