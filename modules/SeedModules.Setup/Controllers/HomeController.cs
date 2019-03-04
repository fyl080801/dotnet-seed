using Microsoft.AspNetCore.Mvc;

namespace SeedModules.Setup.Controllers
{
    public class HomeController : Controller
    {
        IActionResult Index()
        {
            return View();
        }
    }
}