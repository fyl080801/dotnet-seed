using System;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;

namespace SeedModules.Project.Services
{
    public class FormFileInfo : IFileInfo
    {
        readonly IFormFile _formFile;

        public FormFileInfo(IFormFile formFile)
        {
            _formFile = formFile;
        }

        public bool Exists => true;

        public long Length => _formFile.Length;

        public string PhysicalPath => string.Empty;

        public string Name => _formFile.Name;

        public DateTimeOffset LastModified => DateTimeOffset.Now;

        public bool IsDirectory => false;

        public Stream CreateReadStream()
        {
            return _formFile.OpenReadStream();
        }
    }
}