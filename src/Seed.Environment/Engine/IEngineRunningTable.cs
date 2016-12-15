using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public interface IEngineRunningTable
    {
        void Add(EngineEnvironment environment);
        
        void Remove(EngineEnvironment environment);

        EngineEnvironment Match(string host, string appRelativeCurrentExecutionFilePath);
    }
}
