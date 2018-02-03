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
        readonly IHostingEnvironment _hostingEnvironment;

        public HomeController(
            IUIOptionsBuilder optionsBuilder,
            IHostingEnvironment hostingEnvironment)
        {
            _optionsBuilder = optionsBuilder;
            _hostingEnvironment = hostingEnvironment;
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