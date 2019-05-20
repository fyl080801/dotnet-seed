using System;
using System.Threading.Tasks;

namespace SeedCore.DeferredTasks
{
    public interface IDeferredTaskEngine
    {
        bool HasPendingTasks { get; }
        void AddTask(Func<DeferredTaskContext, Task> task);
        Task ExecuteTasksAsync(DeferredTaskContext context);
    }
}
