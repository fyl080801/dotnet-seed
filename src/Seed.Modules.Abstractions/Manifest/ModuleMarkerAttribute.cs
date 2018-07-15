using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Modules.Manifest
{
    [AttributeUsage(AttributeTargets.Assembly, AllowMultiple = false, Inherited = false)]
    public class ModuleMarkerAttribute : ModuleAttribute
    {
        public ModuleMarkerAttribute(string name)
        {
            Name = name;
        }
    }
}
