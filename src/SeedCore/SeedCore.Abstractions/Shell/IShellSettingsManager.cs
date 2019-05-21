using System.Collections.Generic;

namespace SeedCore.Shell
{
    public interface IShellSettingsManager
    {
        ShellSettings CreateDefaultSettings();
        IEnumerable<ShellSettings> LoadSettings();
        void SaveSettings(ShellSettings settings);
    }
}