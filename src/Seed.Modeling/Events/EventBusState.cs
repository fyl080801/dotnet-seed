using System;
using System.Collections.Generic;
using System.Text;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace Seed.Events
{
    public class EventBusState : IEventBusState
    {
        public ConcurrentDictionary<string, ConcurrentQueue<Func<IServiceProvider, IDictionary<string, object>, Task>>> Subscribers { get; private set; }

        public EventBusState()
        {
            Subscribers = new ConcurrentDictionary<string, ConcurrentQueue<Func<IServiceProvider, IDictionary<string, object>, Task>>>();
        }

        public void Add(string message, Func<IServiceProvider, IDictionary<string, object>, Task> action)
        {
            var messageSubscribers = Subscribers.GetOrAdd(message, m => new ConcurrentQueue<Func<IServiceProvider, IDictionary<string, object>, Task>>());
            messageSubscribers.Enqueue(action);
        }
    }
}
