using Microsoft.Extensions.Options;

namespace Seed.Plugins
{
    public class PluginExpanderOptionsSetup : ConfigureOptions<PluginExpanderOptions>
    {
        public PluginExpanderOptionsSetup()
            : base(options => { })
        {
        }
    }
}