using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using Seed.Plugins.Descriptors;
using Seed.Plugins.Feature;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Seed.Plugins
{
    public class PluginProvider : IPluginProvider
    {
        readonly IFileProvider _fileProvider;
        readonly IFeaturesProvider _featuresProvider;

        public int Order => 100;

        public PluginProvider(
            IHostingEnvironment hostingEnvironment,
            IEnumerable<IFeaturesProvider> featureProviders)
        {
            _fileProvider = hostingEnvironment.ContentRootFileProvider;
            _featuresProvider = new CompositeFeaturesProvider(featureProviders);
        }

        public IPluginInfo GetPluginInfo(IDescriptorInfo descriptorInfo, string pluginPath)
        {
            var plugin = _fileProvider
                .GetDirectoryContents(Path.GetDirectoryName(pluginPath))
                .First(content => content.Name == Path.GetFileName(pluginPath));

            return new PluginInfo(plugin.Name, plugin, pluginPath, descriptorInfo, (di, pi) =>
            {
                return _featuresProvider.GetFeatures(pi, di);
            });
        }
    }
}