using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using System.Threading;
using Seed.Extensions.Plugin;
using Microsoft.Extensions.DependencyInjection;

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
                    try
                    {
                        var tf = host.Services.GetService<IPluginFinder>();
                        var dess = tf.GetDescriptors().ToList();

                        host.Run(cts.Token);
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }
            }
        }
    }
}
