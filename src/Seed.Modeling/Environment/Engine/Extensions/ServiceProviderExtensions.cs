using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace Seed.Environment.Engine.Extensions
{
    public static class ServiceProviderExtensions
    {
        public static IServiceCollection CreateChildContainer(this IServiceProvider serviceProvider, IServiceCollection serviceCollection)
        {
            IServiceCollection clonedCollection = new ServiceCollection();
            var serviceTypes = new HashSet<Type>();

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

                        if (!serviceTypes.Add(service.ServiceType))
                        {
                            var serviceType = typeof(IEnumerable<>).MakeGenericType(service.ServiceType);

                            if (serviceTypes.Add(serviceType))
                            {
                                clonedCollection.AddSingleton(serviceType, serviceProvider.GetServices(service.ServiceType));
                            }
                        }
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
