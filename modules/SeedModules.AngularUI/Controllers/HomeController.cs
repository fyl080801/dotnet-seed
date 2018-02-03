using Microsoft.AspNetCore.Mvc;

namespace SeedModules.AngularUI.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            
            return View();
        }
    }
}