using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public interface IEngineStateUpdater
    {
        Task ApplyChanges();
    }
}
