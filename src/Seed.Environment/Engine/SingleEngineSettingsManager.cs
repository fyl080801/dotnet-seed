using Seed.Environment.Engine.Models;
using System.Collections.Generic;
using System.Linq;

namespace Seed.Environment.Engine
{
    public class SingleEngineSettingsManager : IEngineSettingsManager
    {
        public EngineSettings GetSettings(string name)
        {
            return LoadSettings().First();
        }

        public IEnumerable<EngineSettings> LoadSettings()
        {
            yield return new EngineSettings
            {
                Name = "Default",
                State = TenantStates.Running
            };
        }

        public void SaveSettings(EngineSettings engineSettings)
        {
        }

        public bool TryGetSettings(string name, out EngineSettings settings)
        {
            settings = LoadSettings().First();
            return true;
        }
    }
}