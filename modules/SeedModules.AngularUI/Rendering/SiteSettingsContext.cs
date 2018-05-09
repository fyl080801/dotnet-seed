using System;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace SeedModules.AngularUI.Rendering
{
    public class SiteSettingsContext : ISiteSettingsContext
    {
        IDictionary<string, object> _values;

        public SiteSettingsContext()
           : this(new Dictionary<string, object>())
        { }

        public SiteSettingsContext(IDictionary<string, object> values)
        {
            _values = values;
        }

        [JsonIgnore]
        public object this[string key]
        {
            get
            {
                object retVal;
                return _values.TryGetValue(key, out retVal) ? retVal : null;
            }
            set { _values[key] = value; }
        }

        [JsonProperty("prefix")]
        public string Prefix
        {
            get { return this["Prefix"] != null ? this["Prefix"].ToString() : ""; }
            set { this["Prefix"] = value; }
        }

        [JsonProperty("siteName")]
        public string SiteName
        {
            get { return this["SiteName"] != null ? this["SiteName"].ToString() : ""; }
            set { this["SiteName"] = value; }
        }

        [JsonProperty("baseUrl")]
        public string BaseUrl
        {
            get { return this["BaseUrl"] != null ? this["BaseUrl"].ToString() : ""; }
            set { this["BaseUrl"] = value; }
        }

        [JsonProperty("pageSize")]
        public int PageSize
        {
            get { return this["PageSize"] != null ? Convert.ToInt32(this["PageSize"]) : 10; }
            set { this["PageSize"] = value; }
        }

        [JsonProperty("pageCounts")]
        public string PageCounts
        {
            get { return this["PageCounts"] != null ? this["PageCounts"].ToString() : ""; }
            set { this["PageCounts"] = value; }
        }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}