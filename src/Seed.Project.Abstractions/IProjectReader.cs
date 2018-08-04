using Microsoft.Extensions.FileProviders;
using Seed.Project.Models;

namespace Seed.Project
{
    public interface IProjectReader
    {
        ProjectDescriptor ReadDescriptor(IFileInfo fileInfo);
    }
}