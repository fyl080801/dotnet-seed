using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace Seed.Modules
{
    public class NamedModule : INamedModule
    {
        public string Name { get; }

        public Assembly Assembly { get; }

        public NamedModule(string name, Assembly assembly)
        {
            Name = name;
            Assembly = assembly;
        }
    }
}
