using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Engine
{
    /// <summary>
    /// 
    /// </summary>
    public class EngineSettings
    {
        TenantStates _states;

        readonly IDictionary<string, string> _values;

        public EngineSettings()
            : this(new Dictionary<string, string>())
        { }

        public EngineSettings(IDictionary<string, string> values)
        {
            _values = values;

            if (!_values.ContainsKey("State") || !Enum.TryParse(_values["State"], true, out _states))
            {
                _states = TenantStates.Invalid;
            }
        }

        /// <summary>
        /// 获取设置项值
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
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

        public IEnumerable<string> Keys
        {
            get { return _values.Keys; }
        }

        /// <summary>
        /// 名称
        /// </summary>
        public string Name
        {
            get { return this["Name"] ?? ""; }
            set { this["Name"] = value; }
        }

        /// <summary>
        /// 接收请求的 URL
        /// </summary>
        public string RequestUrlHost
        {
            get { return this["RequestUrlHost"]; }
            set { this["RequestUrlHost"] = value; }
        }

        /// <summary>
        /// URL 前缀
        /// </summary>
        public string RequestUrlPrefix
        {
            get { return this["RequestUrlPrefix"]; }
            set { _values["RequestUrlPrefix"] = value; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string DatabaseProvider
        {
            get { return this["DatabaseProvider"]; }
            set { _values["DatabaseProvider"] = value; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string TablePrefix
        {
            get { return this["TablePrefix"]; }
            set { _values["TablePrefix"] = value; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string ConnectionString
        {
            get { return this["ConnectionString"]; }
            set { _values["ConnectionString"] = value; }
        }

        /// <summary>
        /// 
        /// </summary>
        public TenantStates State
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
