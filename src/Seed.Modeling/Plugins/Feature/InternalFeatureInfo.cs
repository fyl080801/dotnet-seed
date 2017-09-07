using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugins.Feature
{
    public class InternalFeatureInfo : IFeatureInfo
    {
        private readonly string _id;
        private readonly string _name;
        private readonly int _priority;
        private readonly string _category;
        private readonly string _description;
        private readonly IPluginInfo _plugin;
        private readonly string[] _dependencies;

        public InternalFeatureInfo(
            string id,
            IPluginInfo pluginInfo)
        {
            _id = id;
            _name = id;
            _priority = 0;
            _category = null;
            _description = null;
            _plugin = pluginInfo;
            _dependencies = new string[0];
        }

        public string Id { get { return _id; } }
        public string Name { get { return _name; } }
        public int Priority { get { return _priority; } }
        public string Category { get { return _category; } }
        public string Description { get { return _description; } }
        public IPluginInfo Plugin { get { return _plugin; } }
        public string[] Dependencies { get { return _dependencies; } }
    }
}
