using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using SeedCore.Shell.Configuration;
using SeedCore.Shell.Models;

namespace SeedCore.Shell
{
    public class ShellSettings
    {
        private ShellConfiguration _settings;
        private ShellConfiguration _configuration;

        public ShellSettings()
        {
            _settings = new ShellConfiguration();
            _configuration = new ShellConfiguration();
        }

        public ShellSettings(ShellConfiguration settings, ShellConfiguration configuration)
        {
            _settings = settings;
            _configuration = configuration;
        }

        public ShellSettings(ShellSettings settings)
        {
            _settings = new ShellConfiguration(settings._settings);
            _configuration = new ShellConfiguration(settings.Name, settings._configuration);

            Name = settings.Name;
        }

        public string Name { get; set; }

        public string RequestUrlHost
        {
            get => _settings["RequestUrlHost"];
            set => _settings["RequestUrlHost"] = value;
        }

        public string RequestUrlPrefix
        {
            get => _settings["RequestUrlPrefix"]?.Trim(' ', '/');
            set => _settings["RequestUrlPrefix"] = value;
        }

        public string DatabaseProvider
        {
            get => _settings["DatabaseProvider"];
            set => _settings["DatabaseProvider"] = value;
        }

        public string TablePrefix
        {
            get => _settings["TablePrefix"];
            set => _settings[""] = value;
        }

        public string ConnectionString
        {
            get => _settings["ConnectionString"];
            set => _settings["ConnectionString"] = value;
        }

        [JsonConverter(typeof(StringEnumConverter))]
        public TenantState State
        {
            get => _settings.GetValue<TenantState>("State");
            set => _settings["State"] = value.ToString();
        }

        [JsonIgnore]
        public IShellConfiguration ShellConfiguration => _configuration;

        [JsonIgnore]
        public string this[string key]
        {
            get => _configuration[key];
            set => _configuration[key] = value;
        }
    }
}
