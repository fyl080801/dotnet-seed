using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Seed.Environment.Engine
{
    public class FileEngineSettingsConfigurationProvider : IEngineSettingsConfigurationProvider
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public FileEngineSettingsConfigurationProvider(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public int Order => 1000;

        public void AddSource(IConfigurationBuilder builder)
        {
            builder.AddJsonFile(Path.Combine(_hostingEnvironment.ContentRootPath, "tenants.json"));
        }

        public void SaveToSource(string name, IDictionary<string, string> configuration)
        {
        }
    }

    public class EngineSettingsWithTenants : EngineSettings
    {
        public EngineSettingsWithTenants(EngineSettings engineSettings) : base(engineSettings.Configuration)
        {
            Features = engineSettings
                .Configuration
                .Where(x => x.Key.StartsWith("Features") && x.Value != null).Select(x => x.Value).ToArray();
        }

        public string[] Features { get; set; }
    }
}