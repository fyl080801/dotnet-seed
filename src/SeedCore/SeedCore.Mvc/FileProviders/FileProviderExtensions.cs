using Microsoft.Extensions.FileProviders;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace SeedCore.Mvc.FileProviders
{
    public static class FileProviderExtensions
    {
        public static IEnumerable<string> GetViewFilePaths(this IFileProvider fileProvider, 
            string subPath,
            string[] extensions, 
            string viewsFolder = null, 
            bool inViewsFolder = false, 
            bool inDepth = true)
        {
            var contents = fileProvider.GetDirectoryContents(subPath);

            if (contents == null)
            {
                yield break;
            }

            if (!inViewsFolder && viewsFolder != null && inDepth)
            {
                var viewsFolderInfo = contents.FirstOrDefault(c => c.Name == viewsFolder && c.IsDirectory);

                if (viewsFolderInfo != null)
                {
                    foreach (var filePath in GetViewFilePaths(fileProvider, $"{subPath}/{viewsFolderInfo.Name}", extensions, viewsFolder, inViewsFolder: true))
                    {
                        yield return filePath;
                    }

                    yield break;
                }
            }

            foreach (var content in contents)
            {
                if (content.IsDirectory && inDepth)
                {
                    foreach (var filePath in GetViewFilePaths(fileProvider, $"{subPath}/{content.Name}", extensions, viewsFolder, inViewsFolder))
                    {
                        yield return filePath;
                    }
                }
                else if (inViewsFolder)
                {
                    if (extensions.Contains(Path.GetExtension(content.Name)))
                    {
                        yield return $"{subPath}/{content.Name}";
                    }
                }
            }
        }
    }
}
