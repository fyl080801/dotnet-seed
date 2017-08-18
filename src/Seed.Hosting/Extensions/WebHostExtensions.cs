using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;

namespace Seed.Hosting.Extensions
{
    public static class WebHostExtensions
    {
        public static void Run(this IWebHost host, Action<IServiceProvider> action, CancellationToken token, string message)
        {
            using (host)
            {
                host.Start();

                var hostingEnvironment = host.Services.GetService<IHostingEnvironment>();
                var applicationLifetime = host.Services.GetService<IApplicationLifetime>();
                var serverAddresses = host.ServerFeatures.Get<IServerAddressesFeature>()?.Addresses;

                Console.WriteLine($"Hosting environment: {hostingEnvironment.EnvironmentName}");
                Console.WriteLine($"Content root path: {hostingEnvironment.ContentRootPath}");
                if (serverAddresses != null)
                {
                    foreach (var address in serverAddresses)
                    {
                        Console.WriteLine($"Now listening on: {address}");
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
