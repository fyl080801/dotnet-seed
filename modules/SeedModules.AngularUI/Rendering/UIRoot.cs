using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.Encodings.Web;

namespace SeedModules.AngularUI.Rendering
{
    public class UIRoot : TagBuilder, IUIRoot
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

        public UIRoot()
            : base("script")
        {
            Attributes.Add("id", "seed-ui");
        }
    }
}
