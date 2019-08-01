using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using SeedCore.Shell;
using SeedModules.Setup.SpaService;

namespace SeedModules.Setup
{
    public static class ControllerExtensions
    {
        /// <summary>
        /// 根据是否是开发环境返回sap页面的视图或跳转到spa开发服务
        /// </summary>
        /// <param name="controller"></param>
        /// <returns></returns>
        public static IActionResult Spa(this Controller controller, SeedSpaOptions options)
        {
            var serviceProvider = controller.HttpContext.RequestServices;
            var env = serviceProvider.GetService<IHostingEnvironment>();
            var shellSettings = serviceProvider.GetService<ShellSettings>();
            // context.HttpContext.Response.Headers.Add("TenantName", shellSettings.Name);
            // context.HttpContext.Response.Headers.Add("RequestUrlPrefix", shellSettings.RequestUrlPrefix);

            /** 
            需要解决的问题：
            1.spa项目生成的视图路径问题
            2.发布后如何让模块请求带上模块前缀
            3.如何带上租户前缀
            ----------------------------------------
            通过中间件捕获请求，来实现在请求spa资源时加上租户前缀
            模块前缀需要在startup中注册一下

            options里是否只写spa名称，在startup里注册spa服务?

            - 需要的信息写到头信息里得了
             */

            if (env.IsDevelopment())
            {
                // return SpaRedirect(controller, "http://invoice-uc.jdcloud.com:8080");
                return controller.Redirect("http://invoice-uc.jdcloud.com:8080" + "");
            }
            else
            {
                return controller.View();
            }
        }

        public static IActionResult SpaRedirect(this Controller controller, string url)
        {
            return new SpaRedirectResult(url, true, true);
        }
    }
}

