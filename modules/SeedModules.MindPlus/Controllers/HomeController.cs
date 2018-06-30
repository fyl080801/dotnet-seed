using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Seed.Mvc.Filters;
using SeedModules.AngularUI.Extensions;

namespace SeedModules.MindPlus.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return this.UI();
        }

        [GenerateAntiforgeryTokenCookie]
        public IActionResult Login()
        {
            return this.UI();
        }

        [Authorize]
        [GenerateAntiforgeryTokenCookie]
        public IActionResult Works()
        {
            // 如果是以amd规范引入的话html编辑器不生效
            return this.UI(
                "/SeedModules.MindPlus/js/wysihtml/wysihtml-toolbar.min.js",
                "/SeedModules.MindPlus/js/wysihtml/parser_rules/advanced_and_extended.js");
        }

        public IActionResult Mind()
        {
            return this.UI();
        }
    }
}