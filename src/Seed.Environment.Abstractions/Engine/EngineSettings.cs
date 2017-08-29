using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Abstractions.Engine
{
    public class EngineSettings
    {
        LauncherStates _states;

        readonly IDictionary<string, string> _values;

        public EngineSettings()
            : this(new Dictionary<string, string>())
        { }

        public EngineSettings(IDictionary<string, string> values)
        {
            _values = values;

            if (!_values.ContainsKey("State") || !Enum.TryParse(_values["State"], true, out _states))
            {
                _states = LauncherStates.Invalid;
            }
        }

        public string this[string key]
        {
            get
            {
                string retVal;
                return _values.TryGetValue(key, out retVal) ? retVal : null;
            }
            set { _values[key] = value; }
        }

        public IDictionary<string, string> Configuration
        {
            get { return _values; }
        }

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
            set { _values["RequestUrlPrefix"] = value; }
        }

        public string DatabaseProvider
        {
            get { return this["DatabaseProvider"]; }
            set { _values["DatabaseProvider"] = value; }
        }

        public string TablePrefix
        {
            get { return this["TablePrefix"]; }
            set { _values["TablePrefix"] = value; }
        }

        public string ConnectionString
        {
            get { return this["ConnectionString"]; }
            set { _values["ConnectionString"] = value; }
        }

        public LauncherStates State
        {
            get { return _states; }
            set
            {
                _states = value;
                this["State"] = value.ToString();
            }
        }
    }
}
