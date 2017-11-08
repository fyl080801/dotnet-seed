using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Modules.DeferredTasks
{
    public class DeferredTaskEngine : IDeferredTaskEngine
    {
        readonly IDeferredTaskState _deferredTaskState;
        readonly ILogger _logger;

        public bool HasPendingTasks => _deferredTaskState.Tasks.Any();

        public DeferredTaskEngine(IDeferredTaskState deferredTaskState, ILogger<DeferredTaskEngine> logger)
        {
            _deferredTaskState = deferredTaskState;
            _logger = logger;
        }

        public void AddTask(Func<DeferredTaskContext, Task> task)
        {
            _deferredTaskState.Tasks.Add(task);
        }

        public async Task ExecuteTasksAsync(DeferredTaskContext context)
        {
            foreach (var task in _deferredTaskState.Tasks)
            {
                try
                {
                    await task(context);
                }
                catch (Exception ex)
                {
                    _logger.LogError("执行延迟进程时发生错误: ", ex);
                }
            }
            _deferredTaskState.Tasks.Clear();
        }
    }
}
