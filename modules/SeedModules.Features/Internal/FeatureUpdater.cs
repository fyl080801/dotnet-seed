using Seed.Plugins.Feature;
using SeedModules.Project.Services;

namespace SeedModules.Features.Internal
{
    public class FeatureUpdater : IFeatureEventHandler
    {
        readonly IProjectExecutor _projectExecutor;

        public FeatureUpdater(IProjectExecutor projectExecutor)
        {
            _projectExecutor = projectExecutor;
        }

        public void Disabled(IFeatureInfo feature)
        {

        }

        public void Disabling(IFeatureInfo feature)
        {

        }

        public void Enabled(IFeatureInfo feature)
        {
            //_projectExecutor.ExecuteAsync()
        }

        public void Enabling(IFeatureInfo feature)
        {

        }

        public void Installed(IFeatureInfo feature)
        {

        }

        public void Installing(IFeatureInfo feature)
        {

        }

        public void Uninstalled(IFeatureInfo feature)
        {

        }

        public void Uninstalling(IFeatureInfo feature)
        {

        }
    }
}