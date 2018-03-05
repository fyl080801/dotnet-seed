using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Seed.Mvc.Filters;
using Seed.Security.Services;
using SeedModules.Security.Domain;

namespace SeedModules.Admin.Controllers
{
    [Route("api/admin/roles")]
    public class RoleController : Controller
    {
        readonly IRoleProvider _roleProvider;

        public RoleController(IRoleProvider roleProvider)
        {
            _roleProvider = roleProvider;
        }

        [HttpGet, HandleResult]
        public async Task<IEnumerable<Role>> GetRoles()
        {
            var roles = await _roleProvider.GetRolesAsync();
            return roles.Select(e => (Role)e).ToArray();
        }

        // [HttpGet("error"), HandleResult]
        // public void TestError()
        // {
        //     throw new Exception("aaaaaaaa");
        // }

        // [HttpGet("str"), HandleResult]
        // public string TestString()
        // {
        //     return "xxxxxxx";
        // }
    }
}