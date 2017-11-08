using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Cache
{
    public interface ISignal
    {
        IChangeToken GetToken(string key);

        void SignalToken(string key);
    }
}
