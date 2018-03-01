using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Plugins.Feature
{
    public class FeatureInfo : IFeatureInfo
    {
        private readonly string _id;
        private readonly string _name;
        private readonly int _priority;
        private readonly string _category = string.Empty;
        private readonly string _description = string.Empty;
        private readonly IPluginInfo _plugin;
        private readonly string[] _dependencies;

        public FeatureInfo(
            string id,
            string name,
            int priority,
            string category,
            string description,
            IPluginInfo plugin,
            string[] dependencies)
        {
            _id = id;
            _name = name;
            _priority = priority;
            _category = category;
            _description = description;
            _plugin = plugin;
            _dependencies = dependencies;
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