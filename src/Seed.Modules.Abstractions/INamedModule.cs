using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace Seed.Modules
{
    public interface INamedModule
    {
        string Name { get; }

        Assembly Assembly { get; }
    }
}
