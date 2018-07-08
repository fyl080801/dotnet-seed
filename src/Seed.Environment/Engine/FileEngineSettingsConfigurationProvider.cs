using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Seed.Environment.Engine
{
    public class FileEngineSettingsConfigurationProvider : IEngineSettingsConfigurationProvider
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public FileEngineSettingsConfigurationProvider(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public int Order => 1000;

        public void AddSource(IConfigurationBuilder builder)
        {
            builder.AddJsonFile(Path.Combine(_hostingEnvironment.ContentRootPath, "tenants.json"));
        }

        public void SaveToSource(string name, IDictionary<string, string> configuration)
        {
        }
    }
}
