using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Modules.Manifest
{
    [AttributeUsage(AttributeTargets.Assembly, AllowMultiple = true, Inherited = false)]
    public class ModuleNameAttribute : Attribute
    {
        public ModuleNameAttribute(string name)
        {
            Name = name ?? String.Empty;
        }

        public string Name { get; }
    }
}
