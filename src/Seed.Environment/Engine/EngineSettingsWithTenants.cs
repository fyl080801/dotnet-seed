using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Environment.Engine
{
    public class EngineSettingsWithTenants : EngineSettings
    {
        public EngineSettingsWithTenants(EngineSettings engineSettings) : base(engineSettings.Configuration)
        {
            Features = engineSettings
                .Configuration
                .Where(x => x.Key.StartsWith("Features") && x.Value != null).Select(x => x.Value).ToArray();
        }

        public string[] Features { get; set; }
    }
}
