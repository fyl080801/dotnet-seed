using Microsoft.AspNetCore.Mvc;
using Seed.Data;

namespace SeedModules.Setup.Controllers
{
    public class HomeController : Controller
    {
        // 不要在未初始化的时候用IDbContext，这时候数据库实例还不存在

        // readonly IDbContext _context;

        // public HomeController(IDbContext context)
        // {
        //     _context = context;
        // }

        public IActionResult Index()
        {
            return View();
        }
    }
}