using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Abstractions.Engine
{
    public interface IEngineSettingsConfigurationProvider
    {
        int Order { get; }

        void AddSource(IConfigurationBuilder builder);

        void SaveToSource(string name, IDictionary<string, string> configuration);
    }
}
