using Microsoft.Extensions.Primitives;
using System.Threading.Tasks;

namespace SeedCore.BackgroundTasks
{
    public interface IBackgroundTaskSettingsProvider
    {
        IChangeToken ChangeToken { get;  }
        Task<BackgroundTaskSettings> GetSettingsAsync(IBackgroundTask task);
    }
}