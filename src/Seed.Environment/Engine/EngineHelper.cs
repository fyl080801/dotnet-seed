using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public static class EngineHelper
    {
        public const string DefaultShellName = "Default";

        public static EngineVariables BuildDefaultUninitializedShell = new EngineVariables
        {
            Name = DefaultShellName,
            State = EngineStates.Uninitialized
        };
    }
}
