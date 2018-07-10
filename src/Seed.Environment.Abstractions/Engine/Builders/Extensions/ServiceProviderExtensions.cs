using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;

namespace Seed.Environment.Engine.Builders
{
    public static class ServiceProviderExtensions
    {
        public static IServiceCollection CreateChildContainer(this IServiceProvider serviceProvider, IServiceCollection serviceCollection)
        {
            IServiceCollection clonedCollection = new ServiceCollection();
            var servicesByType = serviceCollection.GroupBy(s => s.ServiceType);

            foreach (var services in servicesByType)
            {
                if (services.Count() == 1)
                {
                    var service = services.First();

                    if (service.Lifetime == ServiceLifetime.Singleton)
                    {
                        if (service.ServiceType.IsGenericType && service.ServiceType.GenericTypeArguments.Length == 0)
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

                else
                {
                    if (services.All(s => s.Lifetime != ServiceLifetime.Singleton))
                    {
                        foreach (var service in services)
                        {
                            clonedCollection.Add(service);
                        }
                    }

                    else if (services.All(s => s.Lifetime == ServiceLifetime.Singleton))
                    {
                        var instances = serviceProvider.GetServices(services.Key);

                        foreach (var instance in instances)
                        {
                            clonedCollection.AddSingleton(services.Key, instance);
                        }
                    }

                    else
                    {
                        using (var scope = serviceProvider.CreateScope())
                        {
                            var instances = scope.ServiceProvider.GetServices(services.Key);

                            for (var i = 0; i < services.Count(); i++)
                            {
                                if (services.ElementAt(i).Lifetime == ServiceLifetime.Singleton)
                                {
                                    clonedCollection.AddSingleton(services.Key, instances.ElementAt(i));
                                }
                                else
                                {
                                    clonedCollection.Add(services.ElementAt(i));
                                }
                            }
                        }
                    }
                }
            }

            return clonedCollection;
        }
    }
}