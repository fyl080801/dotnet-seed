using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Seed.Mvc.Extensions;
using Seed.Mvc.Filters;
using Seed.Security;
using Seed.Security.Services;
using SeedModules.Security.Domain;

namespace SeedModules.Admin.Controllers
{
    [Route("api/admin/roles")]
    public class RoleController : Controller
    {
        readonly IRoleProvider _roleProvider;
        readonly RoleManager<IRole> _roleManager;

        public RoleController(IRoleProvider roleProvider, RoleManager<IRole> roleManager)
        {
            _roleProvider = roleProvider;
            _roleManager = roleManager;
        }

        [HttpGet, HandleResult]
        public async Task<IEnumerable<Role>> GetRoles()
        {
            var roles = await _roleProvider.GetRolesAsync();
            return roles.Select(e => (Role)e).ToArray();
        }

        [HttpPost, ValidateAntiForgeryToken, HandleResult]
        public async Task<Role> Create([FromBody]Role model)
        {
            if (ModelState.IsValid)
            {
                model.Rolename = model.Rolename.Trim();

                if (await _roleManager.FindByNameAsync(_roleManager.NormalizeKey(model.Rolename)) != null)
                {
                    ModelState.AddModelError(string.Empty, "角色已存在");
                }
            }

            if (ModelState.IsValid)
            {
                var result = await _roleManager.CreateAsync(model);
                if (result.Succeeded)
                {
                    return model;
                }

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            throw this.Exception(ModelState);
        }
    }
}