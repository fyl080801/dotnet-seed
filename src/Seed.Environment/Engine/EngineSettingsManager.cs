using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.CommandLine;
using Microsoft.Extensions.Configuration.EnvironmentVariables;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Seed.Environment.Engine.Configuration;
using Seed.Environment.Engine.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using YamlDotNet.Serialization;

namespace Seed.Environment.Engine
{
    public class EngineSettingsManager : IEngineSettingsManager
    {
        private readonly string _tenantsContainerPath;

        private readonly IConfiguration _configuration;
        private readonly IEnumerable<string> _configuredTenants;
        private readonly Func<string, IConfigurationBuilder> _configBuilderFactory;
        private readonly IEngineConfigurationSources _tenantConfigSources;
        private readonly IEnginesSettingsSources _settingsSources;

        public EngineSettingsManager(
            IConfiguration applicationConfiguration,
            IEnginesConfigurationSources configurationSources,
            IEngineConfigurationSources tenantConfigSources,
            IEnginesSettingsSources settingsSources,
            IOptions<EngineOptions> options)
        {
            var appDataPath = options.Value.ApplicationDataPath;
            _tenantsContainerPath = Path.Combine(appDataPath, options.Value.ContainerName);

            _tenantConfigSources = tenantConfigSources;
            _settingsSources = settingsSources;

            var lastProviders = (applicationConfiguration as IConfigurationRoot)?.Providers
                .Where(p => p is EnvironmentVariablesConfigurationProvider ||
                            p is CommandLineConfigurationProvider)
                .ToArray();

            var configurationBuilder = new ConfigurationBuilder()
                .AddConfiguration(applicationConfiguration)
                .AddSources(configurationSources);

            if (lastProviders.Count() > 0)
            {
                configurationBuilder.AddConfiguration(new ConfigurationRoot(lastProviders));
            }

            _configuration = configurationBuilder.Build().GetSection("OrchardCore");

            _configuredTenants = _configuration.GetChildren()
                .Where(section => section["State"] != null)
                .Select(section => section.Key)
                .Distinct()
                .ToArray();

            _configBuilderFactory = (tenant) =>
            {
                var builder = new ConfigurationBuilder().AddConfiguration(_configuration);

                if (_configuredTenants.Contains(tenant))
                {
                    builder.AddConfiguration(_configuration.GetSection(tenant));
                }

                return builder.AddSources(tenant, _tenantConfigSources);
            };
        }

        public EngineSettings CreateDefaultSettings()
        {
            return new EngineSettings
            (
                new EngineConfiguration(_configuration),
                new EngineConfiguration(_configuration)
            );
        }

        public IEnumerable<EngineSettings> LoadSettings()
        {
            var tenantsSettings = new ConfigurationBuilder()
                .AddSources(_settingsSources)
                .Build();

            var tenants = tenantsSettings.GetChildren().Select(section => section.Key);

            if (!tenants.Any() && File.Exists(Path.Combine(_tenantsContainerPath,
                EngineHelper.DefaultEngineName, "Settings.txt")))
            {
                UpgradeFromBeta2();
                tenantsSettings.Reload();
                tenants = tenantsSettings.GetChildren().Select(section => section.Key);
            }

            var allTenants = _configuredTenants.Concat(tenants).Distinct().ToArray();

            var allSettings = new List<EngineSettings>();

            foreach (var tenant in allTenants)
            {
                var tenantSettings = new ConfigurationBuilder()
                    .AddConfiguration(_configuration)
                    .AddConfiguration(_configuration.GetSection(tenant))
                    .AddConfiguration(tenantsSettings.GetSection(tenant))
                    .Build();

                var settings = new EngineConfiguration(tenantSettings);
                var configuration = new EngineConfiguration(tenant, _configBuilderFactory);

                var shellSettings = new EngineSettings(settings, configuration)
                {
                    Name = tenant,
                };

                allSettings.Add(shellSettings);
            };

            return allSettings;
        }

        public void SaveSettings(EngineSettings settings)
        {
            if (settings == null)
            {
                throw new ArgumentNullException(nameof(settings));
            }

            var configuration = new ConfigurationBuilder()
                .AddConfiguration(_configuration)
                .AddConfiguration(_configuration.GetSection(settings.Name))
                .Build();

            var shellSettings = new EngineSettings()
            {
                Name = settings.Name
            };

            configuration.Bind(shellSettings);

            var configSettings = JObject.FromObject(shellSettings);
            var tenantSettings = JObject.FromObject(settings);

            foreach (var property in configSettings)
            {
                var tenantValue = tenantSettings.Value<string>(property.Key);
                var configValue = configSettings.Value<string>(property.Key);

                if (tenantValue != configValue)
                {
                    tenantSettings[property.Key] = tenantValue;
                }
                else
                {
                    tenantSettings[property.Key] = null;
                }
            }

            tenantSettings.Remove("Name");

            _settingsSources.Save(settings.Name, tenantSettings.ToObject<Dictionary<string, string>>());

            var tenantConfig = new JObject();

            var sections = settings.Configuration.GetChildren()
                .Where(s => !s.GetChildren().Any())
                .ToArray();

            foreach (var section in sections)
            {
                if (settings[section.Key] != configuration[section.Key])
                {
                    tenantConfig[section.Key] = settings[section.Key];
                }
                else
                {
                    tenantConfig[section.Key] = null;
                }
            }

            tenantConfig.Remove("Name");

            _tenantConfigSources.Save(settings.Name, tenantConfig.ToObject<Dictionary<string, string>>());
        }

        // TODO: Can be removed when going to RC.
        private void UpgradeFromBeta2()
        {
            var tenantFolders = Directory.GetDirectories(_tenantsContainerPath);

            foreach (var tenantFolder in tenantFolders)
            {
                var oldSettingsPath = Path.Combine(tenantFolder, "Settings.txt");
                var localConfigPath = Path.Combine(tenantFolder, "appsettings.json");

                if (!File.Exists(oldSettingsPath) || File.Exists(localConfigPath))
                {
                    continue;
                }

                var tenant = Path.GetFileName(tenantFolder);
                var defaultSettings = CreateDefaultSettings();

                using (var reader = new StreamReader(oldSettingsPath))
                {
                    var yamlObject = new Deserializer().Deserialize(reader);
                    var settingsObject = JObject.FromObject(yamlObject)[tenant];

                    var shellSettings = new EngineSettings(defaultSettings)
                    {
                        Name = tenant,
                        RequestUrlHost = settingsObject.Value<string>("RequestUrlHost"),
                        RequestUrlPrefix = settingsObject.Value<string>("RequestUrlPrefix"),
                        State = Enum.TryParse<TenantStates>(settingsObject.Value<string>("State"),
                            out var tenantState) ? tenantState : TenantStates.Invalid
                    };

                    shellSettings["TablePrefix"] = settingsObject.Value<string>("TablePrefix");
                    shellSettings["DatabaseProvider"] = settingsObject.Value<string>("DatabaseProvider");
                    shellSettings["ConnectionString"] = settingsObject.Value<string>("ConnectionString");
                    shellSettings["ProjectName"] = settingsObject.Value<string>("ProjectName");
                    shellSettings["Secret"] = settingsObject.Value<string>("Secret");

                    SaveSettings(shellSettings);
                }
            }
        }
        // private readonly IEnumerable<IEngineSettingsConfigurationProvider> _configurationProviders;

        // public EngineSettingsManager(IEnumerable<IEngineSettingsConfigurationProvider> configurationProviders)
        // {
        //     _configurationProviders = configurationProviders.OrderBy(x => x.Order);
        // }

        // public EngineSettings GetSettings(string name)
        // {
        //     if (!TryGetSettings(name, out EngineSettings settings))
        //     {
        //         throw new ArgumentException("The specified tenant name is not valid.", nameof(name));
        //     }

        //     return settings;
        // }

        // public IEnumerable<EngineSettings> LoadSettings()
        // {
        //     var configurationBuilder = new ConfigurationBuilder();

        //     foreach (var provider in _configurationProviders)
        //     {
        //         provider.AddSource(configurationBuilder);
        //     }

        //     var configurationRoot = configurationBuilder.Build();

        //     foreach (var tenant in configurationRoot.GetChildren())
        //     {
        //         var values = tenant
        //             .AsEnumerable()
        //             .ToDictionary(k => k.Key.Replace((tenant.Key + ":"), string.Empty), v => v.Value);

        //         values.Remove(tenant.Key);
        //         values.Add("Name", tenant.Key);

        //         yield return new EngineSettings(values);
        //     }
        // }

        // public void SaveSettings(EngineSettings settings)
        // {
        //     if (settings == null)
        //     {
        //         throw new ArgumentNullException(nameof(settings));
        //     }

        //     var configuration = new Dictionary<string, string> { { settings.Name, null } };

        //     var settingsconfiguration = settings.Configuration;

        //     foreach (var item in settingsconfiguration)
        //     {
        //         configuration.Add($"{settings.Name}:{item.Key}", item.Value);
        //     }

        //     configuration.Remove($"{settings.Name}:Name");

        //     foreach (var provider in _configurationProviders)
        //     {
        //         provider.SaveToSource(settings.Name, configuration);
        //     }
        // }

        // public bool TryGetSettings(string name, out EngineSettings settings)
        // {
        //     if (string.IsNullOrEmpty(name))
        //     {
        //         throw new ArgumentException("The tenant name cannot be null or empty.", nameof(name));
        //     }

        //     settings = LoadSettings().FirstOrDefault(s => string.Equals(s.Name, name, StringComparison.Ordinal));

        //     return settings != null;
        // }
    }
}