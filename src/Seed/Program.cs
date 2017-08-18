using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Threading;
using Seed.Hosting.Extensions;
using Seed.Hosting;

namespace Seed
{
    public class Program
    {
        public static void Main(string[] args)
        {
            using (var host = BuildWebHost(args))
            {
                using (var ctx = new CancellationTokenSource())
                {
                    host.Run(service =>
                    {
                        new SeedHost(service, Console.In, Console.Out, args).RunAsync().Wait();
                        ctx.Cancel();
                    }, ctx.Token, "Application started. Press Ctrl+C to shut down.");
                }
            }
        }

        public static IWebHost BuildWebHost(string[] args) => WebHost.CreateDefaultBuilder(args)
            .UseIISIntegration()
            .UseKestrel()
            .UseContentRoot(Directory.GetCurrentDirectory())
            .UseStartup<Startup>()
            .Build();
    }
}
