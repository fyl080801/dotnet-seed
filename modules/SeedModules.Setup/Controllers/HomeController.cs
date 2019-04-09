using Microsoft.AspNetCore.Mvc;
using Seed.Data;

namespace SeedModules.Setup.Controllers
{
    public class HomeController : Controller
    {
        // 不要在未初始化的时候用IDbContext，这时候数据库实例还不存在

        public IActionResult Index()
        {
            return Redirect("~/SeedModules.Setup/index.html");
        }
    }
}