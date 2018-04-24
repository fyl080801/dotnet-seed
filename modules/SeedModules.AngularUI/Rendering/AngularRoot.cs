using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace SeedModules.AngularUI.Rendering
{
    public class AngularRoot : TagBuilder, IViewRoot
    {
        public string Src
        {
            get => Attributes["src"];
            set
            {
                if (Attributes.ContainsKey("src")) Attributes["src"] = value;
                else Attributes.Add("src", value);
            }
        }

        public string DataMain
        {
            get => Attributes["data-main"];
            set
            {
                if (Attributes.ContainsKey("data-main")) Attributes["data-main"] = value;
                else Attributes.Add("data-main", value);
            }
        }

        public AngularRoot()
            : base("script")
        {
            Attributes.Add("id", "seed-ui");
            Attributes.Add("data-options", "{ requires: [], references: {}, noDebugs: [] }");
        }

        public void SetOptions(object options)
        {
            var optionsString = (options is string) ? options.ToString() : JsonConvert.SerializeObject(options);
            if (Attributes.ContainsKey("data-options"))
            {
                Attributes["data-options"] = optionsString;
            }
            else
            {
                Attributes.Add("data-options", optionsString);
            }
        }

        public void SetSettings(string siteSettings)
        {
            if (Attributes.ContainsKey("data-site"))
            {
                Attributes["data-site"] = siteSettings;
            }
            else
            {
                Attributes.Add("data-site", siteSettings);
            }
        }

        public void SetProperties(JObject data)
        {
            foreach (var item in data)
            {
                Attributes.Add(item.Key.ToLower(), item.Value.ToString());
            }
        }
    }
}
