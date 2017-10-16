using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedPlugins.Sample.Controllers
{
    [Route("api/apis")]
    public class ApiController : Controller
    {
        [HttpGet]
        public IEnumerable<string> Values()
        {
            return new string[] { "aaa", "bbb" };
        }
    }
}
