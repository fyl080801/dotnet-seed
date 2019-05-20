using System.Collections.Generic;

namespace Seed.Environment.Engine
{
    public interface IEngineSettingsManager
    {
        EngineSettings CreateDefaultSettings();

        IEnumerable<EngineSettings> LoadSettings();

        void SaveSettings(EngineSettings settings);
    }
}