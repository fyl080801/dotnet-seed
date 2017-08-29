using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Abstractions.Engine
{
    public interface IRunningEngineTable
    {
        void Add(EngineSettings settings);

        void Remove(EngineSettings settings);

        EngineSettings Match(string host, string appRelativeCurrentExecutionFilePath);
    }
}
