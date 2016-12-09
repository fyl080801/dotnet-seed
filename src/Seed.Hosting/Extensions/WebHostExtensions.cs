using System;
using System.Threading;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.Extensions.DependencyInjection;

namespace Seed.Hosting.Extensions
{
    public static class WebHostExtensions
    {
        public static void Run(this IWebHost host, Action<IServiceProvider> action, CancellationToken token, string message)
        {
            using (host)
            {
                host.Start();

                var hostingEnvironment = host.Services.GetRequiredService<IHostingEnvironment>();
                var applicationLifetime = host.Services.GetRequiredService<IApplicationLifetime>();
                var serverAddresses = host.ServerFeatures.Get<IServerAddressesFeature>().Addresses;

                Console.WriteLine(hostingEnvironment.EnvironmentName);
                Console.WriteLine(hostingEnvironment.ContentRootPath);
                
                if(serverAddresses!=null)
                {
                    foreach(var address in serverAddresses)
                    {
                        Console.WriteLine($"listening on: {address}");
                    }
                }

                if (!string.IsNullOrEmpty(message))
                {
                    Console.WriteLine(message);
                }

                token.Register(state =>
                {
                    ((IApplicationLifetime)state).StopApplication();
                }, applicationLifetime);

                action(host.Services);
            }
        }
    }
}