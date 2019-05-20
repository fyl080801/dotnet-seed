using System.Collections.Generic;
using Microsoft.Extensions.Configuration;

namespace Seed.Environment.Engine.Configuration
{
    public interface IEnginesSettingsSources
    {
        void AddSources(IConfigurationBuilder builder);
        void Save(string tenant, IDictionary<string, string> data);
    }

    public static class EnginesSettingsSourcesExtensions
    {
        public static IConfigurationBuilder AddSources(this IConfigurationBuilder builder, IEnginesSettingsSources sources)
        {
            sources.AddSources(builder);
            return builder;
        }
    }
}
