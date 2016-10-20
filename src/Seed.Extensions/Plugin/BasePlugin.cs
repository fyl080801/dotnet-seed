using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Extensions.Plugin
{
    public abstract class BasePlugin : IPlugin
    {
        readonly IPluginManager _pluginManager;

        public void Install()
        {
            throw new NotImplementedException();
        }

        public void Uninstall()
        {
            throw new NotImplementedException();
        }
    }
}
