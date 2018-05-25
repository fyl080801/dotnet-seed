using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json;
using Seed.Plugins.Feature;
using SeedModules.Project.Services;

namespace SeedModules.Features.Internal
{
    /// <summary>
    /// 特性启用或禁用时执行的操作
    /// </summary>
    public class FeatureUpdater : IFeatureEventHandler
    {
        readonly IProjectReader _projectReader;
        readonly IProjectExecutor _projectExecutor;
        readonly IHostingEnvironment _hostingEnvironment;

        public FeatureUpdater(
            IProjectReader projectReader,
            IProjectExecutor projectExecutor,
            IHostingEnvironment hostingEnvironment)
        {
            _projectReader = projectReader;
            _projectExecutor = projectExecutor;
            _hostingEnvironment = hostingEnvironment;
        }

        public void Disabled(IFeatureInfo feature)
        {
            ExecuteProjects(feature, ".disabled.json");
        }

        public void Disabling(IFeatureInfo feature)
        {

        }

        public void Enabled(IFeatureInfo feature)
        {
            ExecuteProjects(feature, ".enabled.json");
        }

        public void Enabling(IFeatureInfo feature)
        {

        }

        public void Installed(IFeatureInfo feature)
        {
            ExecuteProjects(feature, ".installed.json");
        }

        public void Installing(IFeatureInfo feature)
        {

        }

        public void Uninstalled(IFeatureInfo feature)
        {
            ExecuteProjects(feature, ".uninstalled.json");
        }

        public void Uninstalling(IFeatureInfo feature)
        {

        }

        private void ExecuteProjects(IFeatureInfo feature, string stateString)
        {
            var projectPath = _hostingEnvironment.ContentRootFileProvider.GetDirectoryContents(feature.Plugin.Path)
                .FirstOrDefault(x => x.IsDirectory && x.Name.Equals("FeatureProjects", StringComparison.CurrentCultureIgnoreCase));

            if (projectPath != null)
            {
                _hostingEnvironment.ContentRootFileProvider.GetDirectoryContents(feature.Plugin.Path + "\\FeatureProjects")
                    .Where(x => !x.IsDirectory && x.Name.EndsWith(feature.Id + stateString))
                    .ToList()
                    .ForEach(file =>
                    {
                        _projectExecutor.ExecuteAsync(Guid.NewGuid().ToString("n"), _projectReader.ReadDescriptor(file), null).Wait();
                    });
            }
        }
    }
}