using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Seed.Environment.Engine.Extensions;
using Seed.Events;
using Seed.Modules;
using Seed.Plugins.Feature;
using System;
using System.Linq;
using System.Reflection;

namespace Seed.Environment.Engine.Builder
{
    public class EngineContainerFactory : IEngineContainerFactory
    {
        readonly IServiceProvider _serviceProvider;
        readonly IServiceCollection _applicationServices;

        public EngineContainerFactory(IServiceProvider serviceProvider, IServiceCollection applicationServices)
        {
            _serviceProvider = serviceProvider;
            _applicationServices = applicationServices;
        }

        public IServiceProvider CreateContainer(EngineSettings settings, EngineSchema schema)
        {
            IServiceCollection tenantServiceCollection = _serviceProvider.CreateChildContainer(_applicationServices);

            tenantServiceCollection.AddSingleton(settings);
            tenantServiceCollection.AddSingleton(schema.Descriptor);
            tenantServiceCollection.AddSingleton(schema);

            AddCoreServices(tenantServiceCollection);

            tenantServiceCollection.AddScoped<IEventBus, DefaultEventBus>();
            tenantServiceCollection.AddSingleton<IEventBusState, EventBusState>();

            IServiceCollection moduleServiceCollection = _serviceProvider.CreateChildContainer(_applicationServices);

            foreach (var dependency in schema.Dependencies.Where(t => typeof(IStartup).IsAssignableFrom(t.Key)))
            {
                moduleServiceCollection.AddSingleton(typeof(IStartup), dependency.Key);
                tenantServiceCollection.AddSingleton(typeof(IStartup), dependency.Key);
            }

            var configuration = new ConfigurationBuilder().AddInMemoryCollection().Build();
            moduleServiceCollection.TryAddSingleton(configuration);
            tenantServiceCollection.TryAddSingleton(configuration);

            moduleServiceCollection.AddSingleton(settings);

            var moduleServiceProvider = moduleServiceCollection.BuildServiceProvider();

            var featureAwareServiceCollection = new FeatureAwareServiceCollection(tenantServiceCollection);

            // 加载所有 IStartup 接口
            var startups = moduleServiceProvider.GetServices<IStartup>().OrderBy(e => e.Order);
            foreach (var startup in startups)
            {
                var feature = schema.Dependencies.FirstOrDefault(x => x.Key == startup.GetType()).Value.FeatureInfo;
                featureAwareServiceCollection.SetCurrentFeature(feature);

                startup.ConfigureServices(featureAwareServiceCollection);
            }

            (moduleServiceProvider as IDisposable).Dispose();

            var applicationServiceDescriptors = _applicationServices.Where(x => x.Lifetime == ServiceLifetime.Singleton);

            var eventHandlers = tenantServiceCollection
                .Union(applicationServiceDescriptors)
                .Select(x => x.ImplementationType)
                .Distinct()
                .Where(t => t != null && typeof(IEventHandler).IsAssignableFrom(t) && t.GetTypeInfo().IsClass)
                .ToArray();

            foreach (var handlerClass in eventHandlers)
            {
                // 使用动态代理响应事件
                foreach (var i in handlerClass.GetInterfaces().Where(t => t != typeof(IEventHandler) && typeof(IEventHandler).IsAssignableFrom(t)))
                {
                    tenantServiceCollection.AddScoped(i, serviceProvider =>
                    {
                        var proxy = DefaultEventBus.CreateProxy(i);
                        proxy.EventBus = serviceProvider.GetService<IEventBus>();
                        return proxy;
                    });
                }
            }

            var engineServiceProvider = tenantServiceCollection.BuildServiceProvider();

            using (var scope = engineServiceProvider.CreateScope())
            {
                var eventBusState = scope.ServiceProvider.GetService<IEventBusState>();

                foreach (var handlerClass in eventHandlers)
                {
                    foreach (var handlerInterface in handlerClass.GetInterfaces().Where(x => typeof(IEventHandler).IsAssignableFrom(x) && typeof(IEventHandler) != x))
                    {
                        foreach (var interfaceMethod in handlerInterface.GetMethods())
                        {
                            eventBusState.Add(
                                $"{handlerInterface.Name}.{interfaceMethod.Name}",
                                (sp, parameters) => DefaultEventBus.Invoke(sp, parameters, interfaceMethod, handlerClass));
                        }
                    }
                }
            }

            var typeFeatureProvider = engineServiceProvider.GetRequiredService<ITypeFeatureProvider>();

            foreach (var featureServiceCollection in featureAwareServiceCollection.FeatureCollections)
            {
                foreach (var serviceDescriptor in featureServiceCollection.Value)
                {
                    if (serviceDescriptor.ImplementationType != null)
                    {
                        typeFeatureProvider.TryAdd(serviceDescriptor.ImplementationType, featureServiceCollection.Key);
                    }
                    else if (serviceDescriptor.ImplementationInstance != null)
                    {
                        typeFeatureProvider.TryAdd(serviceDescriptor.ImplementationInstance.GetType(), featureServiceCollection.Key);
                    }
                    else
                    {
                        // ?
                    }
                }
            }

            return engineServiceProvider;
        }

        private void AddCoreServices(IServiceCollection services)
        {
            services.TryAddScoped<IEngineStateUpdater, EngineStateUpdater>();
            services.TryAddScoped<IEngineStateManager, NullEngineStateManager>();
            services.AddScoped<EngineStateCoordinator>();
            services.AddScoped<IEngineDescriptorManagerEventHandler>(sp => sp.GetRequiredService<EngineStateCoordinator>());
        }
    }
}
