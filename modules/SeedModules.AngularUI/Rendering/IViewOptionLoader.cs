using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Seed.Plugins;

namespace SeedModules.AngularUI.Rendering
{
    public interface IViewOptionLoader
    {
        Task<IEnumerable<JObject>> LoadAsync(IPluginInfo pluginInfo);
    }
}