using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.InPathTest.Controllers
{
    [Route("api/test")]
    public class TestController : Controller
    {
        [HttpGet]
        public IEnumerable<string> Values()
        {
            return new string[] { "bbb", "ccc" };
        }
    }
}
