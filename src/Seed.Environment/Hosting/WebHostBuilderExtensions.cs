using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore;
using PowerArgs;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Seed.Environment.Hosting
{
    public static class WebHostBuilderExtensions
    {
        public static IWebHostBuilder UseArgs(this IWebHostBuilder builder, string[] args)
        {
            var seedArgs = Args.Parse<SeedArgs>(args);

            if (!string.IsNullOrEmpty(seedArgs.Config))
            {
                var config = new ConfigurationBuilder()
                    .AddJsonFile(seedArgs.Config, optional: true)
                    .Build();

                builder.UseConfiguration(config);
            }

            return builder;
        }
    }
}
