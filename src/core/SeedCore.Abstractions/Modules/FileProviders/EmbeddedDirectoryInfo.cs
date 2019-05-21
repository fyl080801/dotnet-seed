using Microsoft.Extensions.FileProviders;
using System;
using System.IO;

namespace SeedCore.Modules.FileProviders
{
    public class EmbeddedDirectoryInfo : IFileInfo
    {
        private string _name;

        public EmbeddedDirectoryInfo(string name)
        {
            _name = name;
        }

        public bool Exists => true;

        public long Length => -1;

        public string PhysicalPath => null;

        /// <inheritdoc />
        public string Name => _name;

        public DateTimeOffset LastModified => DateTimeOffset.MinValue;

        public bool IsDirectory => true;

        public Stream CreateReadStream()
        {
            throw new InvalidOperationException("Cannot create a stream for a directory.");
        }
    }
}