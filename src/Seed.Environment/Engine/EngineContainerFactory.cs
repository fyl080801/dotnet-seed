using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Seed.Environment.Abstractions;
using Seed.Environment.Abstractions.Engine;
using Seed.Environment.Engine.Extensions;
using Seed.Modules.Abstractions;
using Seed.Plugin.Abstractions.Feature;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Environment.Engine
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
            IServiceCollection launcherServiceCollection = _serviceProvider.CreateChildContainer(_applicationServices);

            launcherServiceCollection.AddSingleton(settings);
            launcherServiceCollection.AddSingleton(schema.Descriptor);
            launcherServiceCollection.AddSingleton(schema);

            AddCoreServices(launcherServiceCollection);

            //launcherServiceCollection.AddScoped<IEventBus, >();
            //launcherServiceCollection.AddSingleton<IEventBusState, EventBusState>();

            IServiceCollection moduleServiceCollection = _serviceProvider.CreateChildContainer(_applicationServices);

            foreach (var dependency in schema.Dependencies.Where(t => typeof(IStartup).IsAssignableFrom(t.Key)))
            {
                moduleServiceCollection.AddSingleton(typeof(IStartup), dependency.Key);
                launcherServiceCollection.AddSingleton(typeof(IStartup), dependency.Key);
            }

            var configuration = new ConfigurationBuilder().AddInMemoryCollection().Build();
            moduleServiceCollection.TryAddSingleton(configuration);
            launcherServiceCollection.TryAddSingleton(configuration);

            moduleServiceCollection.AddSingleton(settings);

            var moduleServiceProvider = moduleServiceCollection.BuildServiceProvider();

            //var featureAwareServiceCollection = new FeatureAwareServiceCollection(tenantServiceCollection);

            var startups = moduleServiceProvider.GetServices<IStartup>().OrderBy(e => e.Order);
            foreach (var startup in startups)
            {
                var feature = schema.Dependencies.FirstOrDefault(x => x.Key == startup.GetType()).Value.FeatureInfo;
                //featureAwareServiceCollection.SetCurrentFeature(feature);

                //startup.ConfigureServices(featureAwareServiceCollection);
            }

            (moduleServiceProvider as IDisposable).Dispose();

            var applicationServiceDescriptors = _applicationServices.Where(x => x.Lifetime == ServiceLifetime.Singleton);

            //var eventHandlers = launcherServiceCollection
            //    .Union(applicationServiceDescriptors)
            //    .Select(x => x.ImplementationType)
            //    .Distinct()
            //    .Where(t => t != null && typeof(IEventHandler).IsAssignableFrom(t) && t.GetTypeInfo().IsClass)
            //    .ToArray();

            //foreach (var handlerClass in eventHandlers)
            //{
            //    // Register dynamic proxies to intercept direct calls if an IEventHandler is resolved, dispatching the call to
            //    // the event bus.

            //    foreach (var i in handlerClass.GetInterfaces().Where(t => t != typeof(IEventHandler) && typeof(IEventHandler).IsAssignableFrom(t)))
            //    {
            //        tenantServiceCollection.AddScoped(i, serviceProvider =>
            //        {
            //            var proxy = DefaultOrchardEventBus.CreateProxy(i);
            //            proxy.EventBus = serviceProvider.GetService<IEventBus>();
            //            return proxy;
            //        });
            //    }
            //}

            var engineServiceProvider = launcherServiceCollection.BuildServiceProvider();

            using (var scope = engineServiceProvider.CreateScope())
            {
                //var eventBusState = scope.ServiceProvider.GetService<IEventBusState>();

                //foreach (var handlerClass in eventHandlers)
                //{
                //    foreach (var handlerInterface in handlerClass.GetInterfaces().Where(x => typeof(IEventHandler).IsAssignableFrom(x) && typeof(IEventHandler) != x))
                //    {
                //        foreach (var interfaceMethod in handlerInterface.GetMethods())
                //        {
                //            if (_logger.IsEnabled(LogLevel.Debug))
                //            {
                //                _logger.LogDebug($"{handlerClass.Name}/{handlerInterface.Name}.{interfaceMethod.Name}");
                //            }

                //            //var classMethod = handlerClass.GetMethods().Where(x => x.Name == interfaceMethod.Name && x.GetParameters().Length == interfaceMethod.GetParameters().Length).FirstOrDefault();
                //            Func<IServiceProvider, IDictionary<string, object>, Task> d = (sp, parameters) => DefaultOrchardEventBus.Invoke(sp, parameters, interfaceMethod, handlerClass);
                //            var messageName = $"{handlerInterface.Name}.{interfaceMethod.Name}";
                //            var className = handlerClass.FullName;
                //            eventBusState.Add(messageName, d);
                //        }
                //    }
                //}
            }

            var typeFeatureProvider = engineServiceProvider.GetRequiredService<ITypeFeatureProvider>();

            //foreach (var featureServiceCollection in featureAwareServiceCollection.FeatureCollections)
            //{
            //    foreach (var serviceDescriptor in featureServiceCollection.Value)
            //    {
            //        if (serviceDescriptor.ImplementationType != null)
            //        {
            //            typeFeatureProvider.TryAdd(serviceDescriptor.ImplementationType, featureServiceCollection.Key);
            //        }
            //        else if (serviceDescriptor.ImplementationInstance != null)
            //        {
            //            typeFeatureProvider.TryAdd(serviceDescriptor.ImplementationInstance.GetType(), featureServiceCollection.Key);
            //        }
            //        else
            //        {
            //            // Factory, we can't know which type will be returned
            //        }
            //    }
            //}

            return engineServiceProvider;
        }

        private void AddCoreServices(IServiceCollection services)
        {
            //services.TryAddScoped<IShellStateUpdater, ShellStateUpdater>();
            //services.TryAddScoped<IShellStateManager, NullShellStateManager>();
            //services.AddScoped<ShellStateCoordinator>();
            //services.AddScoped<IShellDescriptorManagerEventHandler>(sp => sp.GetRequiredService<ShellStateCoordinator>());
        }
    }
}
