using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Seed.Data;
using Seed.Environment.Engine.Extensions;
using Seed.Mvc.Extensions;
using Seed.Mvc.Filters;
using Seed.Mvc.Models;
using Seed.Security;
using Seed.Security.Services;
using SeedModules.Admin.Models;
using SeedModules.Security.Domain;

namespace SeedModules.Admin.Controllers
{
    [Route("api/admin/roles")]
    public class RoleController : Controller
    {
        readonly IDbContext _dbContext;
        readonly IRoleProvider _roleProvider;
        readonly RoleManager<IRole> _roleManager;
        readonly UserManager<IUser> _userManager;
        readonly IEnumerable<IRoleRemovedEventHandler> _roleRemovedEventHandlers;
        readonly ILogger _logger;

        public RoleController(
            IDbContext dbContext,
            IRoleProvider roleProvider,
            RoleManager<IRole> roleManager,
            UserManager<IUser> userManager,
            IEnumerable<IRoleRemovedEventHandler> roleRemovedEventHandlers,
            ILogger<RoleController> logger)
        {
            _dbContext = dbContext;
            _roleProvider = roleProvider;
            _roleManager = roleManager;
            _userManager = userManager;
            _roleRemovedEventHandlers = roleRemovedEventHandlers;
            _logger = logger;
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

        [HttpDelete("{id}"), HandleResult]
        public async Task Delete(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);

            if (role == null) throw this.Exception("找不到角色");

            if (role.Rolename == "Administrator") throw this.Exception("管理员角色不能删除");

            await _roleManager.DeleteAsync(role);

            await _roleRemovedEventHandlers.InvokeAsync(e => e.RoleRemovedAsync(role.Rolename), _logger);
        }

        [HttpPatch("{id}/displayname"), HandleResult]
        public async Task SetDisplayName(string id, [FromQuery]string name)
        {
            var role = await _roleManager.FindByIdAsync(id);

            if (role == null) throw this.Exception("找不到角色");

            _dbContext.Set<Role>().Find(int.Parse(id)).DisplayName = name;
            _dbContext.SaveChanges();
        }

        [HttpPost("{id}/members/query"), HandleResult]
        public async Task<PagedResult<User>> Members([FromBody]ListQueryModel model, string id, int page, int count)
        {
            var role = await _roleManager.FindByIdAsync(id);

            if (role == null) throw this.Exception("找不到角色");

            var users = await _userManager.GetUsersInRoleAsync(role.Rolename);

            var query = users.OrderBy(e => e.Username).Select(ConvertToUser).AsQueryable();

            // 先这样，实际上应该是根据角色id查
            return new PagedResult<User>(query, page, count);
        }

        [HttpPost("{id}/notmembers/query"), HandleResult]
        public async Task<PagedResult<User>> NotMembers([FromBody]ListQueryModel model, string id, int page, int count)
        {
            var role = await _roleManager.FindByIdAsync(id);

            if (role == null) throw this.Exception("找不到角色");

            var users = _dbContext.Set<User>().Where(e => !e.Roles.Select(r => r.RoleId).Contains(int.Parse(id)));

            var query = users.OrderBy(e => e.Username).Select(ConvertToUser).AsQueryable();

            return new PagedResult<User>(query, page, count);
        }

        [HttpPost("{id}/members"), HandleResult]
        public async Task AddToRole([FromBody]RoleMembersModel model, string id)
        {
            var role = await _roleManager.FindByIdAsync(id);

            if (role == null) throw this.Exception("找不到角色");

            var newUsers = _dbContext.Set<User>().Where(e => model.Members.Contains(e.Id) && !e.Roles.Select(r => r.RoleId).Contains(int.Parse(id))).ToList();

            newUsers.ForEach(e => e.Roles.Add(new UserRole()
            {
                RoleId = int.Parse(id),
                UserId = e.Id
            }));

            _dbContext.SaveChanges();
        }

        [HttpPatch("{id}/members"), HandleResult]
        public async Task RemoveFromRole([FromBody]RoleMembersModel model, string id)
        {
            var role = await _roleManager.FindByIdAsync(id);

            if (role == null) throw this.Exception("找不到角色");

            var dbSet = _dbContext.Set<UserRole>();

            var usersToRemove = dbSet.Where(e => e.RoleId == int.Parse(id) && model.Members.Contains(e.UserId)).ToList();

            if (role.Rolename == "Administrator")
            {
                // 用户本身是管理员则不能移除本身管理员角色
                var my = await _userManager.FindByNameAsync(User.Identity.Name);
                usersToRemove = usersToRemove.Where(e => e.UserId != ((User)my).Id).ToList();
            }

            dbSet.RemoveRange(usersToRemove);

            _dbContext.SaveChanges();
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