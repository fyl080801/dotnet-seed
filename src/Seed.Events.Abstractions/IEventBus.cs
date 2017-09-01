using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Events.Abstractions
{
    public interface IEventBus
    {
        Task NotifyAsync(string message, IDictionary<string, object> arguments);

        void Subscribe(string message, Func<IServiceProvider, IDictionary<string, object>, Task> action);
    }
}
