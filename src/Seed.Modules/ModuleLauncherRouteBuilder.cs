using Microsoft.AspNetCore.Builder.Internal;
using Microsoft.AspNetCore.Routing;
using System;

namespace Seed.Modules
{
    public class ModuleLauncherRouteBuilder : IModuleLauncherRouteBuilder
    {
        IServiceProvider _serviceProvider;

        public ModuleLauncherRouteBuilder(IServiceProvider serviceProvider)
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
