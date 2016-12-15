using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class SingleEngineManager : IEngineManager
    {
        public IEnumerable<EngineEnvironment> LoadEnvironment()
        {
            yield return new EngineEnvironment
            {
                Name = "Default",
                State = EngineStates.Running
            };
        }

        public void SaveEnvironment(EngineEnvironment environment)
        {

        }
    }
}
