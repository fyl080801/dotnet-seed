using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Events
{
    public class NotifyProxy<T> : DispatchProxy, INotifyProxy
    {
        public IEventBus EventBus { get; set; }

        protected override object Invoke(MethodInfo targetMethod, object[] args)
        {
            var message = typeof(T).Name + "." + targetMethod.Name;

            var parameters = new Dictionary<string, object>();
            var methodParameters = targetMethod.GetParameters();
            for (var i = 0; i < methodParameters.Length; i++)
            {
                var parameterName = methodParameters[i].Name;
                parameters[parameterName] = args[i];
            }

            Task.WaitAll(EventBus.NotifyAsync(message, parameters));

            return null;
        }
    }
}