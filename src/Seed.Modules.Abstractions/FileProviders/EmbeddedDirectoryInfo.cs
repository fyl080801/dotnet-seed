using System;
using System.IO;
using Microsoft.Extensions.FileProviders;

namespace Seed.Modules.FileProviders
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

        public string Name => _name;

        public DateTimeOffset LastModified => DateTimeOffset.MinValue;

        public bool IsDirectory => true;

        public Stream CreateReadStream()
        {
            throw new InvalidOperationException("还不能创建一个对目录读取的流");
        }
    }
}