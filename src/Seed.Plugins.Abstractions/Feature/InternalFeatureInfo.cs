using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugins.Feature
{
    public class InternalFeatureInfo : IFeatureInfo
    {
        readonly string _id;
        readonly string _name;
        readonly int _priority;
        readonly string _category;
        readonly string _description;
        readonly IPluginInfo _plugin;
        readonly string[] _dependencies;

        public InternalFeatureInfo(string id, IPluginInfo pluginInfo)
        {
            _id = id;
            _name = id;
            _priority = 0;
            _category = null;
            _description = null;
            _plugin = pluginInfo;
            _dependencies = new string[0];
        }

        public string Id => _id;

        public string Name => _name;

        public int Priority => _priority;

        public string Category => _category;

        public string Description => _description;

        public IPluginInfo Plugin => _plugin;

        public string[] Dependencies => _dependencies;
    }
}
