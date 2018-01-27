using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Engine
{
    public class EngineHelper
    {
        public const string DefaultEngineName = "Default";

        public static EngineSettings BuildDefaultUninitializedEngine = new EngineSettings
        {
            Name = DefaultEngineName,
            State = TenantStates.Uninitialized
        };
    }
}
