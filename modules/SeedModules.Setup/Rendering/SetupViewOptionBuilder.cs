using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Seed.Plugins;
using SeedModules.AngularUI.Rendering;

namespace SeedModules.Setup.Rendering
{
    public class SetupViewOptionBuilder : AllViewOptionBuilder
    {
        public SetupViewOptionBuilder(
            IOptions<ViewOptions> options,
            IPluginManager pluginManager,
            IHostingEnvironment hostingEnvironment,
            ILogger<AllViewOptionBuilder> logger)
            : base(options, pluginManager, hostingEnvironment, logger)
        {
        }

        protected override Task<IEnumerable<ViewReference>> GetViewReferences(IPluginInfo pluginInfo)
        {
            if (pluginInfo.Id != "SeedModules.Setup" && pluginInfo.Id != "SeedModules.AngularUI")
                return Task.FromResult<IEnumerable<ViewReference>>(new List<ViewReference>());

            return base.GetViewReferences(pluginInfo);
        }
    }
}