using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Modules
{
    /// <summary>
    /// 激活 Launher 会话前后触发的事件
    /// </summary>
    public interface IModuleTenantEvents
    {
        Task ActivatingAsync();

        Task ActivatedAsync();

        Task TerminatingAsync();

        Task TerminatedAsync();
    }
}
