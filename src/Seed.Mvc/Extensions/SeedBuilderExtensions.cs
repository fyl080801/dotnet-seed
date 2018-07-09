using Seed.Modules.Builder;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Mvc.Extensions
{
    public static class SeedBuilderExtensions
    {
        public static SeedBuilder AddMvc(this SeedBuilder builder)
        {
            return builder.RegisterStartup<Startup>();
        }
    }
}
