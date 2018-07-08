using System;
using System.Threading;
using System.Threading.Tasks;

namespace Seed.Environment.BackgroundTasks
{
    public interface IBackgroundTask
    {
        Task DoWorkAsync(IServiceProvider serviceProvider, CancellationToken cancellationToken);
    }
}
