using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Seed.Mvc.Extensions;
using Seed.Mvc.Filters;
using Seed.Security;
using SeedModules.Admin.Models;
using System.Threading.Tasks;

namespace SeedModules.Admin.Controllers
{
    [Route("api/account")]
    [Authorize]
    public class AccountController : Controller
    {
        readonly SignInManager<IUser> _signInManager;

        public AccountController(SignInManager<IUser> signInManager)
        {
            _signInManager = signInManager;
        }

        [HttpPost("login"), HandleResult]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<LoginResult> Login([FromBody]LoginModel model, [FromQuery]string returnUrl = null)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, model.IsRemember, false);

                if (result.Succeeded)
                {
                    return new LoginResult(true)
                    {
                        ReturnUrl = returnUrl
                    };
                }
                else
                {
                    throw this.Exception("登录不成功");
                }
            }
            else
            {
                throw this.Exception("输入信息有误");
            }
        }

        [HttpPost("logout")]
        [ValidateAntiForgeryToken]
        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }
    }
}