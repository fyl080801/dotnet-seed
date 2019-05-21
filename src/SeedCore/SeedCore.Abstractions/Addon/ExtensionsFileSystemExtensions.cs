using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using System.IO;

namespace SeedCore.Addon
{
    public static class ExtensionsFileSystemExtensions
    {
        public static IFileInfo GetExtensionFileInfo(
            this IHostingEnvironment parentFileSystem,
            IExtensionInfo extensionInfo,
            string subPath)
        {
            return parentFileSystem.ContentRootFileProvider.GetFileInfo(
                Path.Combine(extensionInfo.SubPath, subPath));
        }
    }
}
