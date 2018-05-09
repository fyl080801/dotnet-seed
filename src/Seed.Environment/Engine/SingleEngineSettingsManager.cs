using Seed.Environment.Engine;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Engine
{
    public class SingleEngineSettingsManager : IEngineSettingsManager
    {
        public IEnumerable<EngineSettings> LoadSettings()
        {
            yield return new EngineSettings
            {
                Name = "Default",
                State = TenantStates.Running
            };
        }

        public void SaveSettings(EngineSettings settings)
        {

        }
    }
}
