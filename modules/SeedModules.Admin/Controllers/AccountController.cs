using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Seed.Mvc.Models;
using SeedModules.Admin.Models;
using SeedModules.Admin.Users;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Seed.Mvc.Extensions;

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

        [HttpPost("login")]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ApiResult> Login([FromBody]LoginModel model, [FromQuery]string returnUrl = null)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, model.IsRemember, false);

                if (result.Succeeded)
                {
                    return this.Success(new LoginResult()
                    {
                        ReturnUrl = returnUrl
                    });
                }
                else
                {
                    return this.Error("登录不成功");
                }
            }
            else
            {
                return this.Error("输入信息有误");
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