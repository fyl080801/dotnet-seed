using Seed.Events.Abstractions;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Events
{
    public class DefaultEventBus : IEventBus
    {
        private readonly IEventBusState _state;
        private readonly IServiceProvider _serviceProvider;

        public DefaultEventBus(
            IEventBusState state,
            IServiceProvider serviceProvider)
        {
            _state = state;
            _serviceProvider = serviceProvider;
        }

        public async Task NotifyAsync(string message, IDictionary<string, object> arguments)
        {
            var messageSubscribers = _state.Subscribers.GetOrAdd(message, m => new ConcurrentBag<Func<IServiceProvider, IDictionary<string, object>, Task>>());
            foreach (var subscriber in messageSubscribers)
            {
                await subscriber(_serviceProvider, arguments);
            }
        }

        public void Subscribe(string message, Func<IServiceProvider, IDictionary<string, object>, Task> action)
        {
            _state.Add(message, action);
        }

        public static Task Invoke(IServiceProvider serviceProvider, IDictionary<string, object> arguments, MethodInfo methodInfo, Type handlerClass)
        {
            var service = serviceProvider.GetService(handlerClass);
            var methodParameters = methodInfo.GetParameters();
            var parameters = new object[methodParameters.Length];
            for (var i = 0; i < methodParameters.Length; i++)
            {
                var parameterName = methodParameters[i].Name;

                object value = null;
                if (!arguments.TryGetValue(parameterName, out value))
                {
                    var parameterType = methodParameters[i].ParameterType;
                    if (parameterType.GetTypeInfo().IsValueType)
                    {
                        value = Activator.CreateInstance(parameterType);
                    }

                    value = null;
                }

                parameters[i] = value;
            }

            var result = methodInfo.Invoke(service, parameters) as Task;
            if (result != null)
            {
                return result;
            }

            return Task.CompletedTask;
        }

        public static INotifyProxy CreateProxy(Type interfaceType)
        {
            var genericNotifyProxyType = typeof(NotifyProxy<>).MakeGenericType(interfaceType);
            var genericDispatchProxyCreateMethod = typeof(DispatchProxy).GetMethod("Create").MakeGenericMethod(interfaceType, genericNotifyProxyType);
            var proxyType = genericDispatchProxyCreateMethod.Invoke(null, null) as INotifyProxy;

            return proxyType;
        }
    }
}
