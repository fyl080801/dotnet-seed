using Microsoft.AspNetCore.Mvc;
using SeedModules.AngularUI.Models;
using SeedModules.AngularUI.Rendering;
using Microsoft.Extensions.DependencyInjection;

namespace SeedModules.AngularUI.Extensions
{
    public static class ControllerExtensions
    {
        const string DefaultView = ".Modules/SeedModules.AngularUI/Views/Home/Index.cshtml";

        public static IActionResult UI(this Controller controller, ViewOptionsModel model)
        {
            return controller.View(DefaultView, model);
        }

        public static IActionResult UI(this Controller controller, params string[] scripts)
        {
            return UI(controller, DefaultView, scripts);
        }

        private static IActionResult UI(this Controller controller, string view, ViewOptionsModel model)
        {
            return controller.View(view, model);
        }

        private static IActionResult UI(this Controller controller, string view, params string[] scripts)
        {
            // 回头考虑在Filters里定义页面引用的脚本，这里获取
            return UI(controller, view, new ViewOptionsModel()
            {
                Options = controller.HttpContext.RequestServices.GetService<IViewOptionsBuilder>().Build(controller.RouteData).Result,
                SiteSettings = controller.HttpContext.RequestServices.GetService<ISiteSettingsBuilder>().Build().ToString(),
                Scripts = scripts != null ? scripts : new string[0]
            });
        }
    }
}