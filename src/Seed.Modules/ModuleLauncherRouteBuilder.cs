using Seed.Modules.Abstractions;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Builder.Internal;

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
