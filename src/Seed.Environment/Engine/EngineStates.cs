using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public enum EngineStates
    {
        Uninitialized,
        Initializing,
        Running,
        Disabled,
        Shutdown
    }
}
