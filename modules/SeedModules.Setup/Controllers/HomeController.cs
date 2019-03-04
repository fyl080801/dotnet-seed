using Microsoft.AspNetCore.Mvc;

namespace SeedModules.Setup.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}