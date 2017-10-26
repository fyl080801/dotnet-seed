using Microsoft.AspNetCore.Mvc.Rendering;

namespace SeedModules.AngularUI.Rendering
{
    public class AngularUIRoot : TagBuilder, IUIRoot
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

        public AngularUIRoot()
            : base("script")
        {
            Attributes.Add("id", "seed-ui");
            Attributes.Add("data-options", "{ version: '1.0', requires: [], references: {}, noDebugs: [] }");
        }
    }
}
