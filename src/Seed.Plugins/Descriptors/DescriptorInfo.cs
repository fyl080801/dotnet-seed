using Seed.Plugins.Abstractions.Descriptors;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Linq;

namespace Seed.Plugins.Descriptors
{
    public class DescriptorInfo : IDescriptorInfo
    {
        private readonly IConfigurationRoot _configurationRoot;
        private string _typeName;
        private Lazy<IEnumerable<string>> _tags;
        private Lazy<Version> _version;

        public DescriptorInfo(IConfigurationRoot configurationRoot, string typeName)
        {
            _configurationRoot = configurationRoot;
            _typeName = typeName;
            _tags = new Lazy<IEnumerable<string>>(ParseTags);
            _version = new Lazy<Version>(ParseVersion);
        }

        public bool Exists => true;

        public string Name => _configurationRoot["name"];

        public string Description => _configurationRoot["description"];

        public string TypeName => _typeName;

        public string Author => _configurationRoot["author"];

        public string Website => _configurationRoot["website"];

        public Version Version => _version.Value;

        public IEnumerable<string> Tags => _tags.Value;

        public IConfigurationRoot ConfigurationRoot => _configurationRoot;

        private IEnumerable<string> ParseTags()
        {
            var tags = _configurationRoot["tags"];

            if (string.IsNullOrWhiteSpace(tags))
                return Enumerable.Empty<string>();

            return tags.Split(new[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries).ToArray();
        }

        private Version ParseVersion()
        {
            var value = _configurationRoot["version"];

            if (string.IsNullOrWhiteSpace(value))
                return new Version(0, 0);

            Version version;
            Version.TryParse(value, out version);
            return version;
        }
    }
}
