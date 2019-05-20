using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Seed.Environment.Engine.Configuration;
using Seed.Environment.Engine.Models;

namespace Seed.Environment.Engine
{
    public class EngineSettings
    {
        private EngineConfiguration _settings;
        private EngineConfiguration _configuration;

        public EngineSettings()
        {
            _settings = new EngineConfiguration();
            _configuration = new EngineConfiguration();
        }

        public EngineSettings(EngineConfiguration settings, EngineConfiguration configuration)
        {
            _settings = settings;
            _configuration = configuration;
        }

        public EngineSettings(EngineSettings settings)
        {
            _settings = new EngineConfiguration(settings._settings);
            _configuration = new EngineConfiguration(settings.Name, settings._configuration);

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

        public string TablePrefix
        {
            get => _settings["TablePrefix"];
            set => _settings["TablePrefix"] = value;
        }

        public string DatabaseProvider
        {
            get => _settings["DatabaseProvider"];
            set => _settings["DatabaseProvider"] = value;
        }

        public string ConnectionString
        {
            get => _settings["ConnectionString"];
            set => _settings["ConnectionString"] = value;
        }

        [JsonConverter(typeof(StringEnumConverter))]
        public TenantStates State
        {
            get => _settings.GetValue<TenantStates>("State");
            set => _settings["State"] = value.ToString();
        }

        [JsonIgnore]
        public IEngineConfiguration Configuration => _configuration;

        [JsonIgnore]
        public string this[string key]
        {
            get => _configuration[key];
            set => _configuration[key] = value;
        }
    }
}
