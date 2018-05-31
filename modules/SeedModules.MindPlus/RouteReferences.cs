﻿using SeedModules.AngularUI.Models;
using SeedModules.AngularUI.Rendering;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.MindPlus
{
    public class RouteReferences : IRouteReferenceProvider
    {
        static RouteViewReference Admin_Home_Index = new RouteViewReference("SeedModules.Admin/Home/Index",
            "SeedModules.MindPlus/modules/admin/module");

        static RouteViewReference MindPlus_Home_Index = new RouteViewReference("SeedModules.MindPlus/Home/Index",
            "SeedModules.MindPlus/modules/portals/module");

        static RouteViewReference MindPlus_Home_Works = new RouteViewReference("SeedModules.MindPlus/Home/Works",
            "rcss!SeedModules.MindPlus/css/mindplus.css",
            "SeedModules.MindPlus/modules/myworks/module");

        static RouteViewReference MindPlus_Home_Mind = new RouteViewReference("SeedModules.MindPlus/Home/Mind",
            "rcss!SeedModules.MindPlus/css/mindplus.css",
            "rcss!SeedModules.MindPlus/css/kityminder.core.css",
            "rcss!SeedModules.MindPlus/js/kityminder/kityminder.editor.min.css",
            "rcss!SeedModules.MindPlus/js/hotbox/hotbox.css",
            "rcss!SeedModules.MindPlus/js/color-picker/color-picker.min.css",
            "SeedModules.MindPlus/modules/mind/module");

        public IEnumerable<RouteViewReference> GetViewReferences()
        {
            return new[] {
                Admin_Home_Index,
                MindPlus_Home_Index,
                MindPlus_Home_Works,
                MindPlus_Home_Mind
            };
        }
    }
}
