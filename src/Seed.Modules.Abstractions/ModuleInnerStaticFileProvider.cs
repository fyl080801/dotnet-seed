using System;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Primitives;

namespace Seed.Modules
{
    public class ModuleInnerStaticFileProvider : ISeedFileProvider
    {
        readonly IHostingEnvironment _environment;
        readonly string _name;
        readonly string _path;

        public ModuleInnerStaticFileProvider(IHostingEnvironment environment, string name, string path)
        {
            _environment = environment;
            _name = name;
            _path = path + '/';
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
                if (module == _name && _environment.GetApplication().NamedModules.Count(e => e.Name.Equals(module, StringComparison.Ordinal)) > 0)
                {
                    return _environment.GetModule(module).GetFileInfo(_path + path.Substring(index + 1));
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