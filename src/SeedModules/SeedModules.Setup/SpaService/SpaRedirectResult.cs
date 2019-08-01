using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SeedCore.Shell;
using Microsoft.Extensions.DependencyInjection;

namespace SeedModules.Setup.SpaService
{
    public class SpaRedirectResult : RedirectResult
    {
        public SpaRedirectResult(string url) : base(url) { }

        public SpaRedirectResult(string url, bool permanent) : base(url, permanent) { }

        public SpaRedirectResult(string url, bool permanent, bool preserveMethod) : base(url, permanent, preserveMethod) { }

        public override Task ExecuteResultAsync(ActionContext context)
        {
            // 写入租户信息
            var shellSettings = context.HttpContext.RequestServices.GetService<ShellSettings>();
            context.HttpContext.Response.Headers.Add("TenantName", shellSettings.Name);
            context.HttpContext.Response.Headers.Add("RequestUrlPrefix", shellSettings.RequestUrlPrefix);
            return base.ExecuteResultAsync(context);
        }
    }
}