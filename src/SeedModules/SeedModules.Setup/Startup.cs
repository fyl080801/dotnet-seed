using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.DependencyInjection;
using SeedCore.Modules;
using SeedModules.Setup.DevelopmentServer;
using System;
using System.IO;
using System.Reflection;

namespace SeedModules.Setup
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddSetup();

            // services.AddSpaStaticFiles(configuration =>
            // {
            //     configuration.RootPath = "../SeedModules/SeedModules.Setup/wwwroot/ClientApp/build";
            // });
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            routes.MapAreaRoute(
                name: "Setup",
                areaName: "SeedModules.Setup",
                template: "",
                defaults: new { controller = "Home", action = "Index" }
            );

            // app.MapWhen((context) =>
            //     {
            //         return context.Request.Path.StartsWithSegments("/spa");
            //     }, appbuilder =>
            //     {
            //         appbuilder.UseSeedSpa(spa =>
            //                 {
            //                     spa.Options.SourcePath = "../SeedModules/SeedModules.Setup/wwwroot/ClientApp";
            //                     if (serviceProvider.GetService<IHostingEnvironment>().IsDevelopment())
            //                     {
            //                         spa.UseSeedSpaDevelopmentServer(npmScript: "start");
            //                     }
            //                 });
            //     });



            // var appcontext = serviceProvider.GetService<IApplicationContext>();
            // var path = Path.GetDirectoryName(appcontext.Application.Assembly.Location);
            // var exepath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            // var entpath = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);
            // var callpath = Path.GetDirectoryName(Assembly.GetCallingAssembly().Location);
            // var startpath = Path.GetDirectoryName(Assembly.GetAssembly(typeof(Startup)).Location);
            // Console.WriteLine(path);

            // app.UseSpaStaticFiles(new StaticFileOptions() { });

            // app.UseSpa(spa =>
            // {
            //     // react开发服务只能从相对路径加载
            //     spa.Options.SourcePath = "../SeedModules/SeedModules.Setup/wwwroot/ClientApp";
            //     if (serviceProvider.GetService<IHostingEnvironment>().IsDevelopment())
            //     {
            //         spa.UseReactDevelopmentServer(npmScript: "start");
            //     }
            // });
        }
    }
}
