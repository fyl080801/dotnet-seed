using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;

namespace Seed.Environment.Engine.Configuration
{
    public class EngineConfigurationSources : IEngineConfigurationSources
    {
        private readonly string _container;

        public EngineConfigurationSources(IHostingEnvironment hostingEnvironment, IOptions<EngineOptions> engineOptions)
        {
            _container = Path.Combine(engineOptions.Value.ApplicationDataPath, engineOptions.Value.ContainerName);
            Directory.CreateDirectory(_container);
        }

        public void AddSources(string tenant, IConfigurationBuilder builder)
        {
            builder
                .AddJsonFile(Path.Combine(_container, tenant, "appsettings.json"), optional: true);
        }

        public void Save(string tenant, IDictionary<string, string> data)
        {
            lock (this)
            {
                var tenantFolder = Path.Combine(_container, tenant);
                var appsettings = Path.Combine(tenantFolder, "appsettings.json");

                var config = !File.Exists(appsettings) ? new JObject()
                    : JObject.Parse(File.ReadAllText(appsettings));

                foreach (var key in data.Keys)
                {
                    if (data[key] != null)
                    {
                        config[key] = data[key];
                    }
                    else
                    {
                        config.Remove(key);
                    }
                }

                Directory.CreateDirectory(tenantFolder);
                File.WriteAllText(appsettings, config.ToString());
            }
        }
    }
}