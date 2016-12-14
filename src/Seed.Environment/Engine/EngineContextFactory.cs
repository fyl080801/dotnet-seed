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

        public EngineContext CreateEngineContext(EngineVariables variables)
        {
            var describedContext = CreateDescribedContext(variables, DefaultEngineDescriptor());

            EngineDescriptor currentDescriptor;
            using (var scope = describedContext.CreateServiceScope())
            {
                currentDescriptor = _engineDescriptorManager.GetEngineDescriptor();
            }

            if (currentDescriptor != null)
            {
                return CreateDescribedContext(variables, currentDescriptor);
            }

            return describedContext;
        }

        public EngineContext CreateSetupContext(EngineVariables variables)
        {
            var descriptor = new EngineDescriptor()
            {
                SerialCode = "-1"
            };

            return CreateDescribedContext(variables, descriptor);
        }

        private EngineContext CreateDescribedContext(EngineVariables variables, EngineDescriptor descriptor)
        {
            var provider = _engineContainerFactory.CreateContainer(variables, descriptor);
            return new EngineContext()
            {
                Variables = variables,
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
