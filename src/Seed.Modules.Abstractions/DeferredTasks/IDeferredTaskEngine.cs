using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Modules.DeferredTasks
{
    /// <summary>
    /// 
    /// </summary>
    public interface IDeferredTaskEngine
    {
        bool HasPendingTasks { get; }

        void AddTask(Func<DeferredTaskContext, Task> task);

        Task ExecuteTasksAsync(DeferredTaskContext context);
    }
}
