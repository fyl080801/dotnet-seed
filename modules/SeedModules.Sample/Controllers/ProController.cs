using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Sample.Controllers
{
    [Route("api/pro")]
    public class ProController : Controller
    {
        [HttpGet]
        public IEnumerable<string> Values()
        {
            return new string[] { "aaa" };
        }
    }
}
