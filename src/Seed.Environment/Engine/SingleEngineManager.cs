using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class SingleEngineManager : IEngineManager
    {
        public IEnumerable<EngineVariables> LoadVariables()
        {
            yield return new EngineVariables
            {
                Name = "Default",
                State = EngineStates.Running
            };
        }

        public void SaveVariables(EngineVariables variables)
        {
        }
    }
}
