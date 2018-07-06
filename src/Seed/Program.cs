using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Seed.Environment.Hosting;
using Seed.Environment.Logging;
using System.IO;

namespace Seed
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Build(args).Run();
        }

        public static IWebHost Build(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .UseIISIntegration()
                .UseKestrel()
                .UseArgs(args)
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseNLogWeb()
                .UseStartup<Startup>()
                .Build();
        }
    }
}
