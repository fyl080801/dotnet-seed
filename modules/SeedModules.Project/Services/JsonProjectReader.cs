using System.IO;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json;
using SeedModules.Project.Models;

namespace SeedModules.Project.Services
{
    public class JsonProjectReader : IProjectReader
    {
        public ProjectDescriptor ReadDescriptor(IFileInfo fileInfo)
        {
            using (var stream = fileInfo.CreateReadStream())
            {
                using (var reader = new StreamReader(stream))
                {
                    using (var jsonReader = new JsonTextReader(reader))
                    {
                        var projectDescriptor = new JsonSerializer().Deserialize<ProjectDescriptor>(jsonReader);
                        projectDescriptor.ProjectFileInfo = fileInfo;
                        return projectDescriptor;
                    }
                }
            }
        }
    }
}