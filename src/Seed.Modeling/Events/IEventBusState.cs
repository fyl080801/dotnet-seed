using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Events
{
    public interface IEventBusState
    {
        ConcurrentDictionary<string, ConcurrentQueue<Func<IServiceProvider, IDictionary<string, object>, Task>>> Subscribers { get; }

        void Add(string message, Func<IServiceProvider, IDictionary<string, object>, Task> action);
    }
}
