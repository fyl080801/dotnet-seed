using Seed.Environment.Engine.Models;

namespace Seed.Environment.Engine
{
    public static class EngineHelper
    {
        public const string DefaultEngineName = "Default";

        public static EngineSettings BuildDefaultUninitializedEngine = new EngineSettings
        {
            Name = DefaultEngineName,
            State = TenantStates.Uninitialized
        };
    }
}