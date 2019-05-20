using System.Collections.Generic;
using Microsoft.Extensions.Configuration;

namespace Seed.Environment.Engine.Configuration
{
    public interface IEnginesConfigurationSources
    {
        void AddSources(IConfigurationBuilder builder);
    }

    public static class EnginesConfigurationSourcesExtensions
    {
        public static IConfigurationBuilder AddSources(this IConfigurationBuilder builder, IEnginesConfigurationSources sources)
        {
            sources.AddSources(builder);
            return builder;
        }
    }
}
