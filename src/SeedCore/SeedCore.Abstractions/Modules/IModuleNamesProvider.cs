using System.Collections.Generic;

namespace SeedCore.Modules
{
    public interface IModuleNamesProvider
    {
        IEnumerable<string> GetModuleNames();
    }
}