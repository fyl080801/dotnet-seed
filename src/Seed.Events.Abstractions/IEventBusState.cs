using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Events.Abstractions
{
    public interface IEventBusState
    {
        ConcurrentDictionary<string, ConcurrentBag<Func<IServiceProvider, IDictionary<string, object>, Task>>> Subscribers { get; }

        void Add(string message, Func<IServiceProvider, IDictionary<string, object>, Task> action);
    }
}
