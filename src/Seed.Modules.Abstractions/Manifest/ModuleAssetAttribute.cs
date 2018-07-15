using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Modules.Manifest
{
    [AttributeUsage(AttributeTargets.Assembly, AllowMultiple = true, Inherited = false)]
    public class ModuleAssetAttribute : Attribute
    {
        public ModuleAssetAttribute(string asset)
        {
            Asset = asset ?? String.Empty;
        }

        public string Asset { get; }
    }
}
