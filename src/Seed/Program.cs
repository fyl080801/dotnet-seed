using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Seed.Hosting;
using System;
using System.IO;
using System.Threading;

namespace Seed
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Build(args).Run();

            //using (var host = Build(args))
            //{
            //    using (var ctx = new CancellationTokenSource())
            //    {
            //        host.Run(service =>
            //        {
            //            new SeedHost(service, Console.In, Console.Out, args).RunAsync().Wait();
            //            ctx.Cancel();
            //        }, ctx.Token, "Application started. Press Ctrl+C to shut down.");
            //    }
            //}
        }

        public static IWebHost Build(string[] args) => WebHost.CreateDefaultBuilder(args)
            .UseKestrel()
            .UseContentRoot(Directory.GetCurrentDirectory())
            .UseIISIntegration()
            .UseStartup<Startup>()
            .Build();
    }
}
