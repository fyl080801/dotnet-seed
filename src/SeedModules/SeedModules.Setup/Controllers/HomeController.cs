using Microsoft.AspNetCore.Mvc;
using SeedCore.Setup;

namespace SeedModules.Setup.Controllers
{
    public class HomeController : Controller
    {
        readonly ISetupService _setupService;

        public HomeController(ISetupService setupService)
        {
            _setupService = setupService;
        }

        public IActionResult Index()
        {
            return this.Spa(null);
        }
    }
}
