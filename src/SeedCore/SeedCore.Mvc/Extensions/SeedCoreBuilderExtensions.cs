using SeedCore.Mvc;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class SeedCoreBuilderExtensions
    {
        public static SeedCoreBuilder AddMvc(this SeedCoreBuilder builder)
        {
            return builder.RegisterStartup<Startup>();
        }
    }
}
