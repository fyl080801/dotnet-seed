using System;
using System.IO;
using Microsoft.Extensions.FileProviders;

namespace Seed.Modules.FileProviders
{
    public class EmbeddedDirectoryInfo : IFileInfo
    {
        private string _name;
        private Stream _stream;

        public EmbeddedDirectoryInfo(string name, Stream stream)
        {
            _name = name;
            _stream = stream;
        }

        public bool Exists => true;

        public long Length => -1;

        public string PhysicalPath => null;

        public string Name => _name;

        public DateTimeOffset LastModified => DateTimeOffset.MinValue;

        public bool IsDirectory => true;

        public Stream CreateReadStream()
        {
            return _stream;
        }
    }
}