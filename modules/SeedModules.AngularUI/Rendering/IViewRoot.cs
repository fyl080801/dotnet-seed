using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.AngularUI.Rendering
{
    public interface IViewRoot : IViewContent
    {
        string Src { get; set; }

        string DataMain { get; set; }

        void SetOptions(object options);

        void SetSettings(string siteSettings);

        void SetProperties(JObject data);
    }
}
