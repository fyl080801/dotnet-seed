using Seed.Plugins.Abstractions.Descriptors;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using System.Linq;

namespace Seed.Plugins.Abstractions.Descriptors
{
    public class NullDescriptorInfo : IDescriptorInfo
    {
        private readonly IFileInfo _fileInfo;

        public NullDescriptorInfo(string subPath)
        {
            _fileInfo = new NotFoundFileInfo(subPath);
        }

        public IFileInfo Descriptor
        {
            get { return _fileInfo; }
        }

        public bool Exists => false;

        public string Name => null;

        public string Description => null;

        public string TypeName => null;

        public string Author => null;

        public Version Version => null;

        public IEnumerable<string> Tags => Enumerable.Empty<string>();

        public IConfigurationRoot ConfigurationRoot => null;
    }
}
