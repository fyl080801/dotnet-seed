using Microsoft.Extensions.Configuration;
using Seed.Environment.Engine;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Environment.Engine
{
    /// <summary>
    /// 常规的 EngineSettingsManager，可通过多个 IEngineSettingsConfigurationProvider 存取配置
    /// 将配置放到 ConfigurationBuilder 中
    /// </summary>
    public class EngineSettingsManager : IEngineSettingsManager
    {
        readonly IEnumerable<IEngineSettingsConfigurationProvider> _configurationProviders;

        public EngineSettingsManager(IEnumerable<IEngineSettingsConfigurationProvider> configurationProviders)
        {
            _configurationProviders = configurationProviders.OrderBy(e => e.Order);
        }

        public IEnumerable<EngineSettings> LoadSettings()
        {
            var configurationBuilder = new ConfigurationBuilder();
            foreach (var provider in _configurationProviders)
            {
                provider.AddSource(configurationBuilder);
            }
            var configurationRoot = configurationBuilder.Build();
            foreach (var launcher in configurationRoot.GetChildren())
            {
                var dic = launcher
                    .AsEnumerable()
                    .ToDictionary(k => k.Key.Replace(k.Key + ":", string.Empty), v => v.Value);

                dic.Remove(launcher.Key);

                dic.Add("Name", launcher.Key);

                yield return new EngineSettings(dic);
            }
        }

        public void SaveSettings(EngineSettings settings)
        {
            var configuration = new Dictionary<string, string>()
            {
                { settings.Name, null }
            };

            var settingsConfig = settings.Configuration;

            foreach (var item in settingsConfig)
            {
                configuration.Add($"{settings.Name}:{item.Key}", item.Value);
            }

            settingsConfig.Remove($"{settings.Name}:Name");

            foreach (var provider in _configurationProviders)
            {
                provider.SaveToSource(settings.Name, configuration);
            }
        }
    }
}
