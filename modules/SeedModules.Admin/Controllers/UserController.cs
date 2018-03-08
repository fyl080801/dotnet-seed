using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Seed.Data;
using Seed.Mvc.Extensions;
using Seed.Mvc.Filters;
using Seed.Mvc.Models;
using Seed.Security;
using SeedModules.Security.Domain;

namespace SeedModules.Admin.Controllers
{
    [Route("api/admin/users")]
    public class UserController : Controller
    {
        readonly IDbContext _dbContext;
        readonly UserManager<IUser> _userManager;

        public UserController(IDbContext dbContext, UserManager<IUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        [HttpPost("query"), HandleResult]
        public PagedResult<User> List([FromBody]QueryModel model, [FromQuery]int page, [FromQuery]int count)
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

        [HttpPost]
        public async Task<User> Create(User model)
        {
            if (ModelState.IsValid)
            {
                model.Username = model.Username.Trim();
                if (await _userManager.FindByNameAsync(_userManager.NormalizeKey(model.Username)) != null)
                {
                    ModelState.AddModelError(string.Empty, "用户已存在");
                }
            }

            if (ModelState.IsValid)
            {
                var result = await _userManager.CreateAsync(model);
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