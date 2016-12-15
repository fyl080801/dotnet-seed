using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class EngineContextFactory : IEngineContextFactory
    {
        readonly IEngineContainerFactory _engineContainerFactory;
        readonly IEngineDescriptorManager _engineDescriptorManager;

        public EngineContextFactory(
            IEngineContainerFactory engineContainerFactory,
            IEngineDescriptorManager engineDescriptorManager)
        {
            _engineContainerFactory = engineContainerFactory;
            _engineDescriptorManager = engineDescriptorManager;
        }

        public EngineContext CreateEngineContext(EngineEnvironment environment)
        {
            var describedContext = CreateDescribedContext(environment, DefaultEngineDescriptor());

            EngineDescriptor currentDescriptor;
            using (var scope = describedContext.CreateServiceScope())
            {
                currentDescriptor = _engineDescriptorManager.GetEngineDescriptor();
            }

            if (currentDescriptor != null)
            {
                return CreateDescribedContext(environment, currentDescriptor);
            }

            return describedContext;
        }

        public EngineContext CreateSetupContext(EngineEnvironment environment)
        {
            var descriptor = new EngineDescriptor()
            {
                SerialCode = "-1"
            };

            return CreateDescribedContext(environment, descriptor);
        }

        private EngineContext CreateDescribedContext(EngineEnvironment environment, EngineDescriptor descriptor)
        {
            var provider = _engineContainerFactory.CreateContainer(environment, descriptor);
            return new EngineContext()
            {
                Environment = environment,
                ServiceProvider = provider
            };
        }

        private EngineDescriptor DefaultEngineDescriptor()
        {
            return new EngineDescriptor()
            {
                SerialCode = "0"
            };
        }

    }
}
