using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace Seed.Environment.Engine.Configuration
{
    public class EnginesConfigurationSources : IEnginesConfigurationSources
    {
        private readonly string _environment;
        private readonly string _appsettings;

        public EnginesConfigurationSources(IHostingEnvironment hostingEnvironment, IOptions<EngineOptions> engineOptions)
        {
            _environment = hostingEnvironment.EnvironmentName;
            _appsettings = Path.Combine(engineOptions.Value.ApplicationDataPath, "appsettings");
        }

        public void AddSources(IConfigurationBuilder builder)
        {
            builder
                .AddJsonFile($"{_appsettings}.json", optional: true)
                .AddJsonFile($"{_appsettings}.{_environment}.json", optional: true);
        }
    }
}