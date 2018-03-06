using Newtonsoft.Json;
using Seed.Environment.Engine;
using SeedModules.AngularUI.Rendering;

namespace SeedModules.Setup.Rendering
{
    public class SetupSiteSettingsBuilder : ISiteSettingsBuilder
    {
        readonly EngineSettings _engineSettings;

        public SetupSiteSettingsBuilder(EngineSettings engineSettings)
        {
            _engineSettings = engineSettings;
        }

        public ISiteSettingsContext Build()
        {
            return new SiteSettingsContext()
            {
                Prefix = _engineSettings.RequestUrlPrefix
            };
        }
    }
}