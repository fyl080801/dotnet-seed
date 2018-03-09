using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Seed.Mvc.Extensions;
using Seed.Mvc.Filters;
using Seed.Mvc.Models;
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
        readonly UserManager<IUser> _userManager;

        public RoleController(
            IRoleProvider roleProvider,
            RoleManager<IRole> roleManager,
            UserManager<IUser> userManager)
        {
            _roleProvider = roleProvider;
            _roleManager = roleManager;
            _userManager = userManager;
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

        [HttpPost("{id}/members/query"), HandleResult]
        public async Task<PagedResult<User>> Members([FromBody]QueryModel model, string id, int page, int count)
        {
            var role = await _roleManager.FindByIdAsync(id);

            if (role == null) throw this.Exception("找不到角色");

            var users = await _userManager.GetUsersInRoleAsync(role.Rolename);

            var query = users.OrderBy(e => e.Username).Select(ConvertToUser).AsQueryable();

            // 先这样，实际上应该是根据角色id查
            return new PagedResult<User>(query, page, count);
        }

        private User ConvertToUser(IUser user)
        {
            var e = (User)user;
            return new User()
            {
                Email = e.Email,
                EmailConfirmed = e.EmailConfirmed,
                FirstName = e.FirstName,
                LastName = e.LastName,
                Id = e.Id,
                Username = e.Username
            };
        }
    }
}