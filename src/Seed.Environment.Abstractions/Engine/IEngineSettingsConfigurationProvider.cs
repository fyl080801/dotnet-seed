using System.Collections.Generic;
using Microsoft.Extensions.Configuration;

namespace Seed.Environment.Engine
{
    public interface IEngineSettingsConfigurationProvider
    {
        void AddSource(IConfigurationBuilder builder);

        void SaveToSource(string name, IDictionary<string, string> configuration);

        int Order { get; }
    }
}
