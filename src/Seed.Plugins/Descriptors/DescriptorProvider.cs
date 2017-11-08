using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using Seed.Yaml.Extensions;
using System;
using System.IO;

namespace Seed.Plugins.Descriptors
{
    public class DescriptorProvider : IDescriptorProvider
    {
        public int Order => 0;

        private readonly IFileProvider _fileProvider;

        public DescriptorProvider(IHostingEnvironment hostingEnvironment)
        {
            _fileProvider = hostingEnvironment.ContentRootFileProvider;
        }

        public IConfigurationBuilder GetConfigurationBuilder(IConfigurationBuilder builder, string path)
        {
            var ext = Path.GetExtension(path);

            if (!ext.Equals(".txt", StringComparison.OrdinalIgnoreCase))
            {
                return builder;
            }

            var descriptorFileInfo = _fileProvider.GetFileInfo(path);

            if (!descriptorFileInfo.Exists)
            {
                return builder;
            }

            return builder.AddYamlFile(_fileProvider, path, true, false);
        }
    }
}