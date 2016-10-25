using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Seed.Extensions.Plugin;
using Seed.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Seed
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

            using (host)
            {
                using (var cts = new CancellationTokenSource())
                {
                    //try
                    //{
                    // 要放到host里
                    //    var tf = host.Services.GetService<IPluginFinder>();
                    //    var dess = tf.GetDescriptors().ToList();

                    //    host.Run(cts.Token);
                    //}
                    //catch (Exception ex)
                    //{
                    //    throw ex;
                    //}

                    host.Run((services) =>
                    {
                        var hostAgent = new HostAgent(
                            services,
                            Console.In,
                            Console.Out);
                        hostAgent
                            .RunAsync()
                            .Wait();

                        cts.Cancel();
                    }, cts.Token, "application started, press 'Ctrl + c' to exit.");
                }
            }
        }
    }
}
