using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using System.IO;

namespace Seed.Environment.Plugins
{
    public static class PluginFileSystemExtensions
    {
        public static IFileInfo GetExtensionFileInfo(this IHostingEnvironment parentFileSystem, IPluginInfo pluginInfo, string subPath)
        {
            return parentFileSystem.ContentRootFileProvider.GetFileInfo(Path.Combine(pluginInfo.SubPath, subPath));
        }
    }
}
