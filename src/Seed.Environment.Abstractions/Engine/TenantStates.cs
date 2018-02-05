using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Engine
{
    /// <summary>
    /// 租户状态
    /// </summary>
    public enum TenantStates
    {
        Uninitialized = 0,
        Initializing,
        Running,
        Disabled,
        Invalid
    }
}
