using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Seed.Environment.Engine
{
    public class EngineSettingsManager : IEngineSettingsManager
    {
        private readonly IEnumerable<IEngineSettingsConfigurationProvider> _configurationProviders;

        public EngineSettingsManager(IEnumerable<IEngineSettingsConfigurationProvider> configurationProviders)
        {
            _configurationProviders = configurationProviders.OrderBy(x => x.Order);
        }

        public EngineSettings GetSettings(string name)
        {
            if (!TryGetSettings(name, out EngineSettings settings))
            {
                throw new ArgumentException("The specified tenant name is not valid.", nameof(name));
            }

            return settings;
        }

        public IEnumerable<EngineSettings> LoadSettings()
        {
            var configurationBuilder = new ConfigurationBuilder();

            foreach (var provider in _configurationProviders)
            {
                provider.AddSource(configurationBuilder);
            }

            var configurationRoot = configurationBuilder.Build();

            foreach (var tenant in configurationRoot.GetChildren())
            {
                var values = tenant
                    .AsEnumerable()
                    .ToDictionary(k => k.Key.Replace((tenant.Key + ":"), string.Empty), v => v.Value);

                values.Remove(tenant.Key);
                values.Add("Name", tenant.Key);

                yield return new EngineSettings(values);
            }
        }

        public void SaveSettings(EngineSettings settings)
        {
            if (settings == null)
            {
                throw new ArgumentNullException(nameof(settings));
            }

            var configuration = new Dictionary<string, string> { { settings.Name, null } };

            var settingsconfiguration = settings.Configuration;

            foreach (var item in settingsconfiguration)
            {
                configuration.Add($"{settings.Name}:{item.Key}", item.Value);
            }

            configuration.Remove($"{settings.Name}:Name");

            foreach (var provider in _configurationProviders)
            {
                provider.SaveToSource(settings.Name, configuration);
            }
        }

        public bool TryGetSettings(string name, out EngineSettings settings)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentException("The tenant name cannot be null or empty.", nameof(name));
            }

            settings = LoadSettings().FirstOrDefault(s => string.Equals(s.Name, name, StringComparison.Ordinal));

            return settings != null;
        }
    }
}