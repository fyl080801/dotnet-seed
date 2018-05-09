using Microsoft.AspNetCore.Builder.Internal;
using Microsoft.AspNetCore.Routing;
using System;

namespace Seed.Modules
{
    public class ModuleTenantRouteBuilder : IModuleTenantRouteBuilder
    {
        IServiceProvider _serviceProvider;

        public ModuleTenantRouteBuilder(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public IRouteBuilder Build()
        {
            return new RouteBuilder(new ApplicationBuilder(_serviceProvider))
            {

            };
        }

        public void Configure(IRouteBuilder builder)
        {

        }
    }
}
