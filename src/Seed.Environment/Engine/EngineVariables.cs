using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class EngineVariables
    {
        readonly IDictionary<string, string> _values;
        EngineStates _state;

        public EngineVariables()
        {
            _values = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        }

        public string this[string key]
        {
            get
            {
                string val;
                return _values.TryGetValue(key, out val) ? val : null;
            }
            set { _values[key] = value; }
        }

        public IEnumerable<string> Keys
        {
            get { return _values.Keys; }
        }

        public string Name
        {
            get { return this["Name"] ?? ""; }
            set { this["Name"] = value; }
        }

        public EngineStates State
        {
            get { return _state; }
            set
            {
                _state = value;
                this["State"] = _state.ToString();
            }
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
    }
}
