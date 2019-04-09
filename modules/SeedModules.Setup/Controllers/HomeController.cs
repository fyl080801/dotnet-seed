using Microsoft.AspNetCore.Mvc;
using Seed.Data;

namespace SeedModules.Setup.Controllers
{
    public class HomeController : Controller
    {
        readonly IDbContext _context;

        public HomeController(IDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}