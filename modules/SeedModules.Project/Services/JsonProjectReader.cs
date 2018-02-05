using System.IO;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json;
using SeedModules.Project.Models;

namespace SeedModules.Project.Services
{
    public class JsonProjectReader : IProjectReader
    {
        public ProjectDescriptor ReadDescriptor(Stream stream)
        {
            using (var reader = new StreamReader(stream))
            {
                using (var jsonReader = new JsonTextReader(reader))
                {
                    var projectDescriptor = new JsonSerializer().Deserialize<ProjectDescriptor>(jsonReader);
                    projectDescriptor.ProjectStream = stream;
                    return projectDescriptor;
                }
            }
        }

        public ProjectDescriptor ReadDescriptor(IFileInfo fileInfo)
        {
            using (var stream = fileInfo.CreateReadStream())
            {
                var projectDescriptor = ReadDescriptor(stream);
                projectDescriptor.ProjectFileInfo = fileInfo;
                return projectDescriptor;
            }
        }
    }
}