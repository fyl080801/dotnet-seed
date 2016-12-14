using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Seed.Environment.DependencyInjection
{
    public static class ServiceProviderExtensions
    {
        public static IServiceCollection CreateChildContainer(this IServiceProvider serviceProvider, IServiceCollection serviceCollection)
        {
            IServiceCollection clonedCollection = new ServiceCollection();

            foreach (var service in serviceCollection)
            {
                if (service.Lifetime == ServiceLifetime.Singleton)
                {
                    var serviceTypeInfo = service.ServiceType.GetTypeInfo();

                    if (serviceTypeInfo.IsGenericType && serviceTypeInfo.GenericTypeArguments.Length == 0)
                    {
                        clonedCollection.AddSingleton(service.ServiceType, service.ImplementationType);
                    }
                    else
                    {
                        clonedCollection.AddSingleton(service.ServiceType, serviceProvider.GetService(service.ServiceType));
                    }
                }
                else
                {
                    clonedCollection.Add(service);
                }
            }

            return clonedCollection;
        }
    }
}
