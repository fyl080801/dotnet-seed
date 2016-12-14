using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public interface IEngineRunningTable
    {
        void Add(EngineVariables variables);

        void Remove(EngineVariables variables);

        EngineVariables Match(string host, string appRelativeCurrentExecutionFilePath);
    }
}
