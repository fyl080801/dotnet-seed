using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.AngularUI.Rendering
{
    public interface IUIRoot : IUIContent
    {
        string Src { get; set; }

        string DataMain { get; set; }

        void SetOptions(object options);
    }
}
