using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Modules
{
    public interface IModuleTenantRouteBuilder
    {
        IRouteBuilder Build(IApplicationBuilder appBuilder);

        void Configure(IRouteBuilder builder);
    }
}
