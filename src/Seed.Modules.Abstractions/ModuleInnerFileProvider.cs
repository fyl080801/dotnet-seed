using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Primitives;

namespace Seed.Modules
{
    public class ModuleInnerFileProvider : ISeedFileProvider
    {
        readonly IHostingEnvironment _environment;
        readonly string _name;
        readonly string _path;

        public ModuleInnerFileProvider(IHostingEnvironment environment, string name, string path)
        {
            _environment = environment;
            _name = name;
            _path = path;
        }

        public IDirectoryContents GetDirectoryContents(string subpath)
        {
            return NotFoundDirectoryContents.Singleton;
        }

        public IFileInfo GetFileInfo(string subpath)
        {
            throw new System.NotImplementedException();
        }

        public IChangeToken Watch(string filter)
        {
            return NullChangeToken.Singleton;
        }
    }
}