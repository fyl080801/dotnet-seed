using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using SeedModules.AngularUI.Models;
using SeedModules.AngularUI.Rendering;

namespace SeedModules.AngularUI.Controllers
{
    public class HomeController : Controller
    {
        readonly IUIOptionsBuilder _optionsBuilder;

        public HomeController(IUIOptionsBuilder optionsBuilder)
        {
            _optionsBuilder = optionsBuilder;
        }

        public IActionResult Index()
        {
            return View(new OptionsModel()
            {
                Options = _optionsBuilder.Build().Result
            });
        }
    }
}