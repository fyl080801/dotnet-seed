using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System.Reflection;

namespace Seed.Environment.Engine
{
    public class EngineContainerFactory : IEngineContainerFactory
    {
        readonly IServiceProvider _serviceProvider;
        readonly IServiceCollection _applicationServices;

        public EngineContainerFactory(
            IServiceProvider serviceProvider,
            IServiceCollection applicationServices)
        {
            _serviceProvider = serviceProvider;
            _applicationServices = applicationServices;
        }

        public IServiceProvider CreateContainer(EngineEnvironment environment, EngineDescriptor descriptor)
        {
            IServiceCollection childServiceCollection = _serviceProvider.CreateChildContainer(_applicationServices);

            childServiceCollection.AddSingleton(environment);
            childServiceCollection.AddSingleton(descriptor);

            //AddCoreServices(tenantServiceCollection);

            // Configure event handlers, they are not part of the blueprint, so they have
            // to be added manually. Or need to create a module for this.
            //tenantServiceCollection.AddScoped<IEventBus, DefaultOrchardEventBus>();
            //tenantServiceCollection.AddSingleton<IEventBusState, EventBusState>();
            
            IServiceCollection moduleServiceCollection = _serviceProvider.CreateChildContainer(_applicationServices);

            foreach (var plugin in descriptor.Plugins)
            {
                foreach (var plugintype in plugin.PluginTypes.Where(t => typeof(Plugin.Modules.IStartup).IsAssignableFrom(t)))
                {
                    moduleServiceCollection.AddSingleton(typeof(Plugin.Modules.IStartup), plugintype);
                    childServiceCollection.AddSingleton(typeof(Plugin.Modules.IStartup), plugintype);
                }
            }

            var configuration = new ConfigurationBuilder().AddInMemoryCollection().Build();
            moduleServiceCollection.TryAddSingleton(configuration);
            childServiceCollection.TryAddSingleton(configuration);

            moduleServiceCollection.AddSingleton(environment);

            var moduleServiceProvider = moduleServiceCollection.BuildServiceProvider();

            foreach (var service in moduleServiceProvider.GetServices<Plugin.Modules.IStartup>())
            {
                service.ConfigureServices(childServiceCollection);
            }

            (moduleServiceProvider as IDisposable).Dispose();

            var applicationServiceDescriptors = _applicationServices.Where(x => x.Lifetime == ServiceLifetime.Singleton);

            //var eventHandlers = tenantServiceCollection
            //    .Union(applicationServiceDescriptors)
            //    .Select(x => x.ImplementationType)
            //    .Distinct()
            //    .Where(t => t != null && typeof(IEventHandler).IsAssignableFrom(t) && t.GetTypeInfo().IsClass)
            //    .ToArray();

            //foreach (var handlerClass in eventHandlers)
            //{
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

            var engineServiceProvider = childServiceCollection.BuildServiceProvider();

            using (var scope = engineServiceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                //var eventBusState = scope.ServiceProvider.GetService<IEventBusState>();

                //foreach (var handlerClass in eventHandlers)
                //{
                //    foreach (var handlerInterface in handlerClass.GetInterfaces().Where(x => typeof(IEventHandler).IsAssignableFrom(x) && typeof(IEventHandler) != x))
                //    {
                //        foreach (var interfaceMethod in handlerInterface.GetMethods())
                //        {
                //            //var classMethod = handlerClass.GetMethods().Where(x => x.Name == interfaceMethod.Name && x.GetParameters().Length == interfaceMethod.GetParameters().Length).FirstOrDefault();
                //            Func<IServiceProvider, IDictionary<string, object>, Task> d = (sp, parameters) => DefaultOrchardEventBus.Invoke(sp, parameters, interfaceMethod, handlerClass);
                //            var messageName = $"{handlerInterface.Name}.{interfaceMethod.Name}";
                //            var className = handlerClass.FullName;
                //            eventBusState.Add(messageName, d);
                //        }
                //    }
                //}
            }

            return engineServiceProvider;
        }
    }
}
