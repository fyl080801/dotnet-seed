using Seed.Modules.Manifest;
using System;
using System.Collections.Generic;

namespace Seed.Environment.Plugins.Manifests
{
    public class ManifestInfo : IManifestInfo
    {
        private readonly ModuleAttribute _moduleInfo;
        private Lazy<Version> _version;

        public ManifestInfo
        (
            ModuleAttribute moduleInfo
        )
        {
            _moduleInfo = moduleInfo;
            _version = new Lazy<Version>(ParseVersion);
        }

        public bool Exists => _moduleInfo.Exists;
        public string Name => _moduleInfo.Name ?? _moduleInfo.Id;
        public string Description => _moduleInfo.Description;
        //public string Type => _moduleInfo.Type;
        public string Author => _moduleInfo.Author;
        public string Website => _moduleInfo.Website;
        public Version Version => _version.Value;
        public IEnumerable<string> Tags => _moduleInfo.Tags;
        public ModuleAttribute ModuleInfo => _moduleInfo;

        private Version ParseVersion()
        {
            var value = _moduleInfo.Version;

            if (!Version.TryParse(value, out Version version))
            {
                return new Version(0, 0);
            }

            return version;
        }
    }
}