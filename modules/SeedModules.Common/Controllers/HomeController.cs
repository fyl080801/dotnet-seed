using Microsoft.AspNetCore.Mvc;

namespace SeedModules.Common.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
