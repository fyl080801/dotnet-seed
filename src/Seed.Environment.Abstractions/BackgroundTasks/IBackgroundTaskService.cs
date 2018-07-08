using System;
using System.Collections.Generic;

namespace Seed.Environment.BackgroundTasks
{
    public interface IBackgroundTaskService
    {
        void Activate();

        void Terminate();

        IDictionary<IBackgroundTask, BackgroundTaskState> GetTasks();

        void SetDelay(string group, TimeSpan period);
    }
}
