using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace Seed
{
    public class Program
    {
        public static void Main(string[] args)
             => BuildWebHost(args).Run();

        public static IWebHost BuildWebHost(string[] args)
            => CreateWebHostBuilder(args)
                .Build();

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder<Startup>(args);
    }
}
