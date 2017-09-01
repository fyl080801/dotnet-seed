using Seed.Modules.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;

namespace Seed.Mvc
{
    public class Startup : StartupBase
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            //if (string.IsNullOrEmpty(_configuration["Sample"]))
            //{
            //    throw new Exception(":(");
            //}

            routes.MapAreaRoute
            (
                name: "Home",
                areaName: "Seed.Mvc",
                template: "",
                defaults: new { controller = "Home", action = "Index" }
            );
        }
    }
}
