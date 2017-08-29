using Seed.Environment.Abstractions.Engine;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Engine
{
    public class EngineSettingsManager : IEngineSettingsManager
    {
        public IEnumerable<EngineSettings> LoadSettings()
        {
            throw new NotImplementedException();
        }

        public void SaveSettings(EngineSettings settings)
        {
            throw new NotImplementedException();
        }
    }
}
