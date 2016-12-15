using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public interface IEngineManager
    {
        IEnumerable<EngineEnvironment> LoadEnvironment();

        void SaveEnvironment(EngineEnvironment setting);
    }
}
