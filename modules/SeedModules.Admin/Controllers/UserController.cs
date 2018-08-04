using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Seed.Data;
using Seed.Mvc.Extensions;
using Seed.Mvc.Filters;
using Seed.Mvc.Models;
using Seed.Security;
using SeedModules.Admin.Models;
using SeedModules.Admin.Users.Services;
using SeedModules.Security.Domain;
using System.Linq;
using System.Threading.Tasks;

namespace SeedModules.Admin.Controllers
{
    [Route("api/admin/users")]
    public class UserController : Controller
    {
        readonly IDbContext _dbContext;
        readonly IUserService _userService;
        readonly UserManager<IUser> _userManager;

        public UserController(
            IDbContext dbContext,
            IUserService userService,
            UserManager<IUser> userManager)
        {
            _dbContext = dbContext;
            _userService = userService;
            _userManager = userManager;
        }

        [HttpPost("query"), HandleResult, Permission("ManageUsers")]
        public PagedResult<User> List([FromBody]ListQueryModel model, [FromQuery]int page, [FromQuery]int count)
        {
            var userSet = _dbContext.Set<User>();
            var query = userSet.OrderBy(e => e.Username).Select(e => new User()
            {
                Email = e.Email,
                EmailConfirmed = e.EmailConfirmed,
                FirstName = e.FirstName,
                LastName = e.LastName,
                Id = e.Id,
                Username = e.Username
            });

            return new PagedResult<User>(query, page, count);
        }

        [HttpPost, ValidateAntiForgeryToken, HandleResult]
        public async Task<User> Create([FromBody]UserCreateModel model)
        {
            if (ModelState.IsValid)
            {
                model.Username = model.Username.Trim();
                if (await _userManager.FindByNameAsync(_userManager.NormalizeKey(model.Username)) != null)
                {
                    ModelState.AddModelError("Username", "用户已存在");
                }
            }

            if (!ModelState.IsValid) throw this.Exception(ModelState);

            var result = await _userService.CreateUserAsync(model.Username, model.Email, new string[0], model.Password, (key, message) =>
            {
                ModelState.AddModelError(key, message);
            });

            if (!ModelState.IsValid) throw this.Exception(ModelState);

            await _userService.ChangeNameAsync(result, model.FirstName ?? string.Empty, model.LastName ?? string.Empty, (key, message) =>
            {
                ModelState.AddModelError(key, message);
            });

            if (!ModelState.IsValid) throw this.Exception(ModelState);

            var user = result as User;

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;

            return user;
        }

        [HttpPatch("name/{id}"), ValidateAntiForgeryToken, HandleResult]
        public async Task ChangeName([FromBody]PersonalNameModel model, string id)
        {
            if (!ModelState.IsValid)
            {
                throw this.Exception(ModelState);
            }

            var user = (User)await _userManager.FindByIdAsync(id);
            if (user == null) throw this.Exception("用户不存在");

            await _userService.ChangeNameAsync(user, model.FirstName, model.LastName, (key, message) =>
            {
                ModelState.AddModelError(key, message);
            });

            if (!ModelState.IsValid) throw this.Exception(ModelState);
        }

        [HttpPatch("password/{id}"), ValidateAntiForgeryToken, HandleResult]
        public async Task SetPassword([FromBody]PasswordModel model, string id)
        {
            if (!ModelState.IsValid) throw this.Exception(ModelState);

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                throw this.Exception("用户不存在");
            }

            var step1 = await _userManager.RemovePasswordAsync(user);

            if (!step1.Succeeded) step1.Errors.ToList().ForEach(e => ModelState.AddModelError(e.Code, e.Description));
            if (!ModelState.IsValid) throw this.Exception(ModelState);

            var step2 = await _userManager.AddPasswordAsync(user, model.Password);

            if (!step2.Succeeded) step2.Errors.ToList().ForEach(e => ModelState.AddModelError(e.Code, e.Description));
            if (!ModelState.IsValid) throw this.Exception(ModelState);
        }

        [HttpPatch("password"), ValidateAntiForgeryToken, HandleResult]
        public async Task ChangePassword([FromBody]PasswordModel model)
        {
            if (!ModelState.IsValid) throw this.Exception(ModelState);

            if (model.Password != model.ConfirmPassword) throw this.Exception("密码不一致");

            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                throw this.Exception("用户不存在");
            }

            var result = await _userService.ChangePasswordAsync(user, model.CurrentPassword, model.Password, (key, message) =>
            {
                ModelState.AddModelError(key, message);
            });

            if (!ModelState.IsValid)
            {
                throw this.Exception(ModelState);
            }

            if (!result)
            {
                throw this.Exception("操作失败");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ApiResult> Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return this.Error("用户不存在");
            }

            if (this.User.Identity.Name == user.Username)
            {
                return this.Error("用户不能删除自己");
            }

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                return this.Error("删除不成功");
            }

            return this.Success();
        }
    }
}