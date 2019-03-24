using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.FileProviders.Physical;
using Microsoft.Extensions.Primitives;
using System;
using System.IO;
using System.Linq;

namespace Seed.Modules
{
    /// <summary>
    /// 模块嵌入的静态文件
    /// </summary>
    public class ModuleEmbeddedStaticFileProvider : IFileProvider
    {
        private readonly IHostingEnvironment _environment;
        private readonly string _staticPath;

        public ModuleEmbeddedStaticFileProvider(IHostingEnvironment environment, string staticPath = null)
        {
            _environment = environment;
            _staticPath = string.IsNullOrEmpty(staticPath) ? Module.WebRoot : staticPath;
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

                if (_environment.GetApplication().NamedModules.Count(e => e.Name.Equals(module, StringComparison.Ordinal)) > 0)
                {
                    // 用到模块中的 WebRoot 定义
                    var fileSubPath = _staticPath + path.Substring(index + 1);

                    // 当前不是框架本身，则从模块里找到文件
                    // 否则从应用跟路径找
                    return module != _environment.GetApplication().Name
                        ? _environment.GetModule(module).GetFileInfo(fileSubPath)
                        : new PhysicalFileInfo(new FileInfo(_environment.GetApplication().Root + fileSubPath));
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
