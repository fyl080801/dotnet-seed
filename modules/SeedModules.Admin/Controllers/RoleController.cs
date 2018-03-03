using System;
using Microsoft.AspNetCore.Mvc;
using Seed.Mvc.Filters;

namespace SeedModules.Admin.Controllers
{
    [Route("api/role")]
    public class RoleController : Controller
    {
        [HttpGet("error"), HandleResult]
        public void TestError()
        {
            throw new Exception("aaaaaaaa");
        }

        [HttpGet("str"), HandleResult]
        public string TestString()
        {
            return "xxxxxxx";
        }
    }
}