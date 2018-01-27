using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Engine
{
    public enum TenantStates
    {
        Uninitialized = 0,
        Initializing,
        Running,
        Disabled,
        Invalid
    }
}
