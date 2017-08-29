using Seed.Environment.Abstractions.Engine;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Engine
{
    public class RunningEngineTable : IRunningEngineTable
    {
        public void Add(EngineSettings settings)
        {
            throw new NotImplementedException();
        }

        public EngineSettings Match(string host, string appRelativeCurrentExecutionFilePath)
        {
            throw new NotImplementedException();
        }

        public void Remove(EngineSettings settings)
        {
            throw new NotImplementedException();
        }
    }
}
