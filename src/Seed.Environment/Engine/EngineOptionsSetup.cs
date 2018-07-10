using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using System;
using System.IO;

namespace Seed.Environment.Engine
{
    public class EngineOptionsSetup : IConfigureOptions<EngineOptions>
    {
        private const string OrchardAppData = "SEED_APP_DATA";
        private const string DefaultAppDataPath = "App_Data";
        private const string DefaultSitesPath = "Sites";

        private readonly IHostingEnvironment _hostingEnvironment;

        public EngineOptionsSetup(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public void Configure(EngineOptions options)
        {
            var appData = System.Environment.GetEnvironmentVariable(OrchardAppData);

            if (!String.IsNullOrEmpty(appData))
            {
                options.ApplicationDataPath = Path.Combine(_hostingEnvironment.ContentRootPath, appData);
            }
            else
            {
                options.ApplicationDataPath = Path.Combine(_hostingEnvironment.ContentRootPath, DefaultAppDataPath);
            }

            options.ContainerName = DefaultSitesPath;
        }
    }
}