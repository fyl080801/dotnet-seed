using System.Collections.Generic;
using Microsoft.Extensions.Configuration;

namespace Seed.Environment.Engine.Configuration
{
    public interface IEngineConfigurationSources
    {
        void AddSources(string tenant, IConfigurationBuilder builder);
        void Save(string tenant, IDictionary<string, string> data);
    }

    public static class EngineConfigurationSourcesExtensions
    {
        public static IConfigurationBuilder AddSources(this IConfigurationBuilder builder, string tenant, IEngineConfigurationSources sources)
        {
            sources.AddSources(tenant, builder);
            return builder;
        }
    }
}
