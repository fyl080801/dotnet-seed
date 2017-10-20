using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Seed.Plugins.Descriptors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Seed.Plugins.Feature;

namespace Seed.Plugins
{
    public class PluginProvider : IPluginProvider
    {
        private readonly IFileProvider _fileProvider;
        private readonly IFeaturesProvider _featuresProvider;

        public PluginProvider(
            IHostingEnvironment hostingEnvironment,
            IEnumerable<IFeaturesProvider> featureProviders)
        {
            _fileProvider = hostingEnvironment.ContentRootFileProvider;
            _featuresProvider = new CompositeFeaturesProvider(featureProviders);
        }

        public int Order { get { return 100; } }

        public IPluginInfo GetPluginInfo(IDescriptorInfo descriptorInfo, string pluginPath)
        {
            var path = Path.GetDirectoryName(pluginPath);
            var name = Path.GetFileName(pluginPath);

            var plugin = _fileProvider
                .GetDirectoryContents(path)
                .First(content => content.Name == name);

            return new PluginInfo(plugin.Name, plugin, pluginPath, descriptorInfo, (mi, ei) =>
            {
                return _featuresProvider.GetFeatures(ei, mi);
            });
        }
    }
}