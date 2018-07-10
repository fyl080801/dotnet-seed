using System;
using System.Collections.Generic;
using Seed.Environment.Engine.Models;

namespace Seed.Environment.Engine
{
    public class EngineSettings
    {
        private TenantStates _tenantState;

        public EngineSettings() : this(new Dictionary<string, string>()) { }

        public EngineSettings(IDictionary<string, string> configuration)
        {
            Configuration = new Dictionary<string, string>(configuration);

            if (!configuration.ContainsKey("State") || !Enum.TryParse(configuration["State"], true, out _tenantState))
            {
                _tenantState = TenantStates.Invalid;
            }
        }

        public string this[string key]
        {
            get
            {
                string retVal;
                return Configuration.TryGetValue(key, out retVal) ? retVal : null;
            }
            set { Configuration[key] = value; }
        }

        public IDictionary<string, string> Configuration { get; }

        public string Name
        {
            get { return this["Name"] ?? ""; }
            set { this["Name"] = value; }
        }

        public string RequestUrlHost
        {
            get { return this["RequestUrlHost"]; }
            set { this["RequestUrlHost"] = value; }
        }

        public string RequestUrlPrefix
        {
            get { return this["RequestUrlPrefix"]; }
            set { Configuration["RequestUrlPrefix"] = value; }
        }

        public string DatabaseProvider
        {
            get { return this["DatabaseProvider"]; }
            set { Configuration["DatabaseProvider"] = value; }
        }

        public string TablePrefix
        {
            get { return this["TablePrefix"]; }
            set { Configuration["TablePrefix"] = value; }
        }

        public string ConnectionString
        {
            get { return this["ConnectionString"]; }
            set { Configuration["ConnectionString"] = value; }
        }

        public TenantStates State
        {
            get => _tenantState;
            set
            {
                _tenantState = value;
                this["State"] = value.ToString();
            }
        }
    }
}
