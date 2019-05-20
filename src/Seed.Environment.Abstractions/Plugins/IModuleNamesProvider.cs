using System.Collections.Generic;

namespace Seed.Environment.Plugins
{
    public interface IModuleNamesProvider
    {
        IEnumerable<string> GetModuleNames();
    }
}