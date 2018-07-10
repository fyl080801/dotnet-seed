using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Seed.Yaml;
using Seed.Yaml.Extensions;
using System.Collections.Generic;
using System.IO;

namespace Seed.Environment.Engine
{
    public class EngineSettingsConfigurationProvider : IEngineSettingsConfigurationProvider
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IOptions<EngineOptions> _optionsAccessor;

        public EngineSettingsConfigurationProvider(
            IHostingEnvironment hostingEnvironment,
            IOptions<EngineOptions> optionsAccessor)
        {
            _hostingEnvironment = hostingEnvironment;
            _optionsAccessor = optionsAccessor;
        }

        public int Order => 1000;

        public void AddSource(IConfigurationBuilder builder)
        {
            var tenantSettingsPath = Path.Combine(
                        _optionsAccessor.Value.ApplicationDataPath,
                        _optionsAccessor.Value.ContainerName);

            if (!Directory.Exists(tenantSettingsPath))
            {
                return;
            }

            var tenants = Directory.GetDirectories(tenantSettingsPath);

            foreach (var tenant in tenants)
            {
                var filePath = GetSettingsFilePath(tenant);

                if (File.Exists(filePath))
                {
                    builder.AddYamlFile(filePath);
                }
            }
        }

        public void SaveToSource(string name, IDictionary<string, string> configuration)
        {
            var settingsFile = GetSettingsFilePath(Path.Combine(
                        _optionsAccessor.Value.ApplicationDataPath,
                        _optionsAccessor.Value.ContainerName,
                        name));

            var configurationProvider = new YamlConfigurationProvider(new YamlConfigurationSource
            {
                Path = settingsFile,
                Optional = false
            });

            configurationProvider.Set(name, null);
            configurationProvider.Set($"{name}:RequestUrlHost", ObtainValue(configuration, $"{name}:RequestUrlHost"));
            configurationProvider.Set($"{name}:RequestUrlPrefix", ObtainValue(configuration, $"{name}:RequestUrlPrefix"));
            configurationProvider.Set($"{name}:DatabaseProvider", ObtainValue(configuration, $"{name}:DatabaseProvider"));
            configurationProvider.Set($"{name}:TablePrefix", ObtainValue(configuration, $"{name}:TablePrefix"));
            configurationProvider.Set($"{name}:ConnectionString", ObtainValue(configuration, $"{name}:ConnectionString"));
            configurationProvider.Set($"{name}:State", ObtainValue(configuration, $"{name}:State"));

            configurationProvider.Commit();
        }

        private string ObtainValue(IDictionary<string, string> configuration, string key)
        {
            configuration.TryGetValue(key, out string value);
            return (value ?? "~");
        }

        private string GetSettingsFilePath(string tenantFolderPath) => Path.Combine(tenantFolderPath, "Settings.txt");
    }
}
