using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Seed.Environment.Engine.Extensions;
using Seed.Mvc.Models;
using Seed.Security.Extensions;
using Seed.Security.Permissions;

namespace Seed.Mvc.Filters
{
    public class PermissionAttribute : ActionFilterAttribute
    {
        public string Name { get; private set; }

        public PermissionAttribute(string name)
        {
            Name = name;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var authorizationService = context.HttpContext.RequestServices.GetService<IAuthorizationService>();
            var permissionProviders = context.HttpContext.RequestServices.GetServices<IPermissionProvider>();
            var logger = context.HttpContext.RequestServices.GetService<ILogger<PermissionAttribute>>();

            var permissions = permissionProviders.InvokeAsync(e => GetProviderPermissions(e), logger).Result;

            var permissionInfo = permissions.FirstOrDefault(e => e.Name == this.Name);

            if (permissionInfo == null)
            {
                context.Result = new ObjectResult(new ApiResult(false)
                {
                    Message = "未知访问权限"
                });
            }
            else if (!authorizationService.AuthorizeAsync(context.HttpContext.User, permissionInfo).Result)
            {
                context.Result =new ObjectResult(new ApiResult(false)
                {
                    Message = $"用户没有 {permissionInfo.Description} 的权限"
                });
            }
            base.OnActionExecuting(context);
        }

        private Task<IEnumerable<PermissionInfo>> GetProviderPermissions(IPermissionProvider provider)
        {
            return Task.FromResult(provider.GetPermissions());
        }
    }
}