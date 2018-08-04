using Seed.Modules.Builder;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Project.Extensions
{
    public static class SeedBuilderExtensions
    {
        public static SeedBuilder AddProject(this SeedBuilder builder)
        {
            return builder.RegisterStartup<Startup>();
        }
    }
}
