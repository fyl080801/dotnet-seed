using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Abstractions.Engine
{
    public interface IEngineStateUpdater
    {
        Task ApplyChanges();
    }
}
