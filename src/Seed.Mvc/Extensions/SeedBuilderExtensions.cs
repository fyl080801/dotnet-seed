using Seed.Modules.Builder;

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
