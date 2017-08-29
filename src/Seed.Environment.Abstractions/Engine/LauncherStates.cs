using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Abstractions.Engine
{
    public enum LauncherStates
    {
        Uninitialized = 0,
        Initializing,
        Running,
        Disabled,
        Invalid
    }
}
