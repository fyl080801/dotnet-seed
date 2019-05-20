using Seed.Environment.Engine.Models;
using System.Collections.Generic;
using System.Linq;

namespace Seed.Environment.Engine
{
    public class SingleEngineSettingsManager : IEngineSettingsManager
    {
        public EngineSettings CreateDefaultSettings()
        {
            return new EngineSettings()
            {
                Name = "Default",
                State = TenantStates.Running
            };
        }

        public IEnumerable<EngineSettings> LoadSettings()
        {
            yield return new EngineSettings()
            {
                Name = "Default",
                State = TenantStates.Running
            };
        }

        public void SaveSettings(EngineSettings shellSettings)
        {
        }
    }
}