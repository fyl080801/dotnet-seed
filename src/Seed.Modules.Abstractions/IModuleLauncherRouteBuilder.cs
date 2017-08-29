using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Modules.Abstractions
{
    public interface IModuleLauncherRouteBuilder
    {
        IRouteBuilder Build();

        void Configure(IRouteBuilder builder);
    }
}
