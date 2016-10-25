using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Command
{
    public enum CommandReturnCodes
    {
        Ok = 0,

        Error = 1,

        Retry = 2
    }
}
