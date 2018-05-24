using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Seed.Plugins;
using SeedModules.AngularUI.Rendering;

namespace SeedModules.Setup.Rendering
{
    public class SetupViewOptionBuilder : AllViewOptionBuilder
    {
        public SetupViewOptionBuilder(
            IPluginManager pluginManager,
            IHostingEnvironment hostingEnvironment,
            ILogger<AllViewOptionBuilder> logger)
            : base(pluginManager, hostingEnvironment, logger)
        {
        }

        protected override Task<IEnumerable<JObject>> GetViewOptions(IPluginInfo pluginInfo)
        {
            if (pluginInfo.Id != "SeedModules.Setup" && pluginInfo.Id != "SeedModules.AngularUI")
                return Task.FromResult<IEnumerable<JObject>>(new List<JObject>());

            return base.GetViewOptions(pluginInfo);
        }
    }
}