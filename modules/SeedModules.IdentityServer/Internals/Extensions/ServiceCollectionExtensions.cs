using IdentityServer4.Configuration;
using IdentityServer4.Models;
using IdentityServer4.Stores;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;

namespace SeedModules.IdentityServer.Internals.Extensions
{
    internal static class ServiceCollectionExtensions
    {
        internal static IServiceCollection AddSeedIdentityServices(this IServiceCollection services, IHostingEnvironment environment)
        {
            var builder = services.AddSeedIdentityServer();

            if (environment.IsDevelopment())
            {
                builder.AddDevelopIdentityServer();
            }

            // 添加其他服务

            return services;
        }

        /// <summary>
        /// 服务器
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        internal static IIdentityServerBuilder AddSeedIdentityServer(this IServiceCollection services)
        {
            services.AddSingleton<IClientStore, ClientStore>();

            return services.AddIdentityServer();
        }

        /// <summary>
        /// 开发环境测试用
        /// </summary>
        /// <param name="builder"></param>
        internal static void AddDevelopIdentityServer(this IIdentityServerBuilder builder)
        {
            builder
                .AddInMemoryIdentityResources(Enumerable.Empty<IdentityResource>())
                .AddInMemoryClients(Enumerable.Empty<Client>())
                .AddDeveloperSigningCredential();
        }

        /// <summary>
        /// 使用认证服务
        /// </summary>
        /// <param name="app"></param>
        /// <returns></returns>
        internal static IApplicationBuilder UseSeedIdentityServer(this IApplicationBuilder app)
        {
            app.UseIdentityServer();

            return app;
        }
    }
}
