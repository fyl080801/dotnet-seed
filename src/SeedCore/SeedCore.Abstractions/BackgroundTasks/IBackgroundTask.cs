using System;
using System.Threading;
using System.Threading.Tasks;

namespace SeedCore.BackgroundTasks
{
    public interface IBackgroundTask
    {
        Task DoWorkAsync(IServiceProvider serviceProvider, CancellationToken cancellationToken);
    }
}
