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
using Seed.Security;
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
            var permissionService = context.HttpContext.RequestServices.GetService<IPermissionService>();
            var permissionInfo = permissionService.GetPermissionAsync(this.Name).Result;

            if (permissionInfo == null)
            {
                context.Result = new ObjectResult(new ApiResult(false)
                {
                    Message = "未知访问权限"
                });
            }
            else if (!permissionService.CheckPermissionAsync(permissionInfo).Result)
            {
                context.Result = new ObjectResult(new ApiResult(false)
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