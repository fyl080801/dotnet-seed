using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Seed.Data;
using Seed.Environment.Plugins;
using Seed.Modules.Exceptions;
using Seed.Mvc.Extensions;
using Seed.Mvc.Filters;
using Seed.Mvc.Models;
using Seed.Security;
using Seed.Security.Extensions;
using Seed.Security.Permissions;
using Seed.Security.Services;
using SeedModules.Admin.Models;
using SeedModules.Security.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SeedModules.Admin.Controllers
{
    [Route("api/admin/roles")]
    public class RoleController : Controller
    {
        readonly IDbContext _dbContext;
        readonly IRoleProvider _roleProvider;
        readonly RoleManager<IRole> _roleManager;
        readonly UserManager<IUser> _userManager;
        readonly IAuthorizationService _authorizationService;
        readonly IEnumerable<IRoleRemovedEventHandler> _roleRemovedEventHandlers;
        readonly IEnumerable<IPermissionProvider> _permissionProviders;
        readonly ITypeFeatureProvider _typeFeatureProvider;
        readonly ILogger _logger;

        public RoleController(
            IDbContext dbContext,
            IRoleProvider roleProvider,
            RoleManager<IRole> roleManager,
            UserManager<IUser> userManager,
            IAuthorizationService authorizationService,
            IEnumerable<IRoleRemovedEventHandler> roleRemovedEventHandlers,
            IEnumerable<IPermissionProvider> permissionProviders,
            ITypeFeatureProvider typeFeatureProvider,
            ILogger<RoleController> logger)
        {
            _dbContext = dbContext;
            _roleProvider = roleProvider;
            _roleManager = roleManager;
            _userManager = userManager;
            _authorizationService = authorizationService;
            _roleRemovedEventHandlers = roleRemovedEventHandlers;
            _permissionProviders = permissionProviders;
            _typeFeatureProvider = typeFeatureProvider;
            _logger = logger;
        }

        [HttpGet, HandleResult]
        public async Task<IEnumerable<Role>> GetRoles()
        {
            var roles = await _roleProvider.GetRolesAsync();
            return roles.Select(e => (Role)e).ToArray();
        }

        [HttpPost, ValidateAntiForgeryToken, Permission("ManageRoles"), HandleResult]
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

        [HttpDelete("{id}"), Permission("ManageRoles"), HandleResult]
        public async Task Delete(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);

            if (role == null) throw this.Exception("找不到角色");

            if (role.Rolename == "Administrator") throw this.Exception("管理员角色不能删除");

            await _roleManager.DeleteAsync(role);

            await _roleRemovedEventHandlers.InvokeAsync(e => e.RoleRemovedAsync(role.Rolename), _logger);
        }

        [HttpPatch("{id}/displayname"), Permission("ManageRoles"), HandleResult]
        public async Task SetDisplayName(string id, [FromQuery]string name)
        {
            var role = await _roleManager.FindByIdAsync(id);

            if (role == null) throw this.Exception("找不到角色");

            ((Role)role).DisplayName = name;

            await _roleManager.UpdateAsync(role);
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

        [HttpPost("{id}/members"), Permission("AssignRoles"), HandleResult]
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

        [HttpPatch("{id}/members"), Permission("AssignRoles"), HandleResult]
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

        [HttpGet("{id}/permission"), HandleResult]
        public async Task<RolePermissionModel> GetRolePermissions(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);
            var allPermissions = GetPermissions();
            return new RolePermissionModel()
            {
                Enables = await GetEnabledPermissions((Role)role, allPermissions.SelectMany(e => e.Value)),
                Permissions = allPermissions
            };
        }

        [HttpPut("{id}/permission"), Permission("ManageRoles"), HandleResult]
        public async Task SaveRolePermission(string id, [FromBody]string[] permissions)
        {
            var role = (Role)await _roleManager.FindByIdAsync(id);
            var newPermissions = permissions.Select(e => new RoleClaim() { ClaimType = PermissionInfo.ClaimType, ClaimValue = e }).ToArray();
            role.RoleClaims.RemoveAll(e => e.ClaimType == PermissionInfo.ClaimType);
            role.RoleClaims.AddRange(newPermissions);
            await _roleManager.UpdateAsync(role);
        }

        private IDictionary<string, IEnumerable<PermissionInfo>> GetPermissions()
        {
            var existPermissions = new Dictionary<string, IEnumerable<PermissionInfo>>();
            foreach (var permissionProvider in _permissionProviders)
            {
                var feature = _typeFeatureProvider.GetFeatureForDependency(permissionProvider.GetType());
                var permissions = permissionProvider.GetPermissions();
                foreach (var permission in permissions)
                {
                    string title = String.IsNullOrWhiteSpace(permission.Category) ? feature.Name : permission.Category;

                    if (existPermissions.ContainsKey(title))
                    {
                        existPermissions[title] = existPermissions[title].Concat(new[] { permission });
                    }
                    else
                    {
                        existPermissions.Add(title, new[] { permission });
                    }
                }
            }
            return existPermissions;
        }

        private async Task<IEnumerable<string>> GetEnabledPermissions(Role role, IEnumerable<PermissionInfo> all)
        {
            var noneUser = new ClaimsPrincipal(
                new ClaimsIdentity(new[] { new Claim(ClaimTypes.Role, role.Rolename) },
                role.Rolename != "Anonymous" ? "FakeAuthenticationType" : null)
            );

            var result = new List<string>();

            foreach (var permission in all)
            {
                if (await _authorizationService.AuthorizeAsync(noneUser, permission))
                {
                    result.Add(permission.Name);
                }
            }

            return result;
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