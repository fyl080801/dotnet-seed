using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;

namespace Seed.Events.Extensions
{
    public static class EventBusExtensions
    {
        public static void Notify<TEventHandler>(this IEventBus eventBus, Expression<Action<TEventHandler>> eventHandler) where TEventHandler : IEventHandler
        {
            var expression = eventHandler.Body as MethodCallExpression;

            if (expression == null)
            {
                throw new ArgumentException("NotifyAsync 只能是方法调用");
            }

            var interfaceName = expression.Method.DeclaringType.Name;
            var methodName = expression.Method.Name;
            var messageName = $"{interfaceName}.{methodName}";

            var data = expression.Method
                .GetParameters()
                .Select((parameter, index) => new
                {
                    parameter.Name,
                    Value = GetValue(parameter, expression.Arguments[index])
                })
                .ToDictionary(kv => kv.Name, kv => kv.Value);

            eventBus.NotifyAsync(messageName, data).Wait();
        }

        public static Task NotifyAsync<TEventHandler>(this IEventBus eventBus, Expression<Func<TEventHandler, Task>> eventHandler) where TEventHandler : IEventHandler
        {
            var expression = eventHandler.Body as MethodCallExpression;

            if (expression == null)
            {
                throw new ArgumentException("Only method calls are allowed in NotifyAsync");
            }

            var interfaceName = expression.Method.DeclaringType.Name;
            var methodName = expression.Method.Name;
            var messageName = $"{interfaceName}.{methodName}";

            var data = expression.Method
                .GetParameters()
                .Select((parameter, index) => new
                {
                    parameter.Name,
                    Value = GetValue(parameter, expression.Arguments[index])
                })
                .ToDictionary(kv => kv.Name, kv => kv.Value);

            return eventBus.NotifyAsync(messageName, data);
        }

        static private object GetValue(ParameterInfo parameterInfo, Expression member)
        {
            var objectMember = Expression.Convert(member, parameterInfo.ParameterType);

            var getterLambda = Expression.Lambda<Func<object>>(objectMember);

            var getter = getterLambda.Compile();

            return getter();
        }
    }
}
