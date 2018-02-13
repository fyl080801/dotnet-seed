using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SeedModules.Admin.Models;
using SeedModules.Admin.Users;
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

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Login(string returnUrl = null)
        {
            await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);

            return Redirect(returnUrl);
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<LoginResult> Login(LoginModel model, string returnUrl = null)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, model.IsRemember, false);

                return result.Succeeded
                    ? new LoginResult()
                    {
                        Success = true
                    }
                    : new LoginResult()
                    {
                        Success = false,
                        Message = "用户验证信息有误"
                    };
            }
            else
            {
                return new LoginResult()
                {
                    Success = false,
                    Message = ModelState.ToString()
                };
            }
        }

        //[HttpGet]
        //[Route("session")]
        //[AllowAnonymous]
        //public async Task<bool> Session()
        //{
        //    return await Task.FromResult(HttpContext.User.Identity.IsAuthenticated);
        //}

        [HttpPost]
        [Route("logout")]
        [ValidateAntiForgeryToken]
        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }
    }
}