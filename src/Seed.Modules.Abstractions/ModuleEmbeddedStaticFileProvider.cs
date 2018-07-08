using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.FileProviders.Physical;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Seed.Modules
{
    public class ModuleEmbeddedStaticFileProvider : IFileProvider
    {
        private readonly IHostingEnvironment _environment;

        public ModuleEmbeddedStaticFileProvider(IHostingEnvironment environment)
        {
            _environment = environment;
        }

        public IDirectoryContents GetDirectoryContents(string subpath)
        {
            return NotFoundDirectoryContents.Singleton;
        }

        public IFileInfo GetFileInfo(string subpath)
        {
            if (subpath == null)
            {
                return new NotFoundFileInfo(subpath);
            }

            var path = NormalizePath(subpath);

            var index = path.IndexOf('/');

            if (index != -1)
            {
                var module = path.Substring(0, index);

                if (_environment.GetApplication().ModuleNames.Contains(module))
                {
                    var fileSubPath = Module.WebRoot + path.Substring(index + 1);

                    if (module != _environment.GetApplication().Name)
                    {
                        return _environment.GetModule(module).GetFileInfo(fileSubPath);
                    }

                    fileSubPath = _environment.GetApplication().Root + fileSubPath;
                    return new PhysicalFileInfo(new FileInfo(fileSubPath));
                }
            }

            return new NotFoundFileInfo(subpath);
        }

        public IChangeToken Watch(string filter)
        {
            return NullChangeToken.Singleton;
        }

        private string NormalizePath(string path)
        {
            return path.Replace('\\', '/').Trim('/').Replace("//", "/");
        }
    }
}
