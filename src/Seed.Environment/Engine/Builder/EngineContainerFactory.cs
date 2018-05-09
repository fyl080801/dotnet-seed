using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Seed.Environment.Engine.Extensions;
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

            var moduleServiceProvider = moduleServiceCollection.BuildServiceProvider(true);

            var featureAwareServiceCollection = new FeatureAwareServiceCollection(tenantServiceCollection);

            var startups = moduleServiceProvider.GetServices<IStartup>();

            startups = startups.OrderBy(s => s.Order);

            foreach (var startup in startups)
            {
                var feature = schema.Dependencies.FirstOrDefault(x => x.Key == startup.GetType()).Value.FeatureInfo;
                featureAwareServiceCollection.SetCurrentFeature(feature);

                startup.ConfigureServices(featureAwareServiceCollection);
            }

            (moduleServiceProvider as IDisposable).Dispose();

            var applicationServiceDescriptors = _applicationServices.Where(x => x.Lifetime == ServiceLifetime.Singleton);

            var engineServiceProvider = tenantServiceCollection.BuildServiceProvider(true);

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

                    }
                }
            }

            return engineServiceProvider;
        }

        private void AddCoreServices(IServiceCollection services)
        {
            services.TryAddScoped<IEngineStateUpdater, EngineStateUpdater>();
            services.TryAddScoped<IEngineStateManager, NullEngineStateManager>();
            services.AddScoped<IEngineDescriptorManagerEventHandler, EngineStateCoordinator>();
        }
    }
}
