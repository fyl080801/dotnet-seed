using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Extensions.Plugin
{
    public interface IPlugin
    {
        void Install();

        void Uninstall();
    }
}
