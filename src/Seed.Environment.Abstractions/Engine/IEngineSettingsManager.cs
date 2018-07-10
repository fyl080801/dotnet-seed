using System.Collections.Generic;

namespace Seed.Environment.Engine
{
    public interface IEngineSettingsManager
    {
        EngineSettings GetSettings(string name);

        IEnumerable<EngineSettings> LoadSettings();

        void SaveSettings(EngineSettings settings);

        bool TryGetSettings(string name, out EngineSettings settings);
    }
}