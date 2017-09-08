using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine.Descriptors;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Builder
{
    public class EngineContextFactory : IEngineContextFactory
    {
        readonly ICompositionStrategy _compositionStrategy;
        readonly IEngineContainerFactory _engineContainerFactory;
        readonly IEnumerable<EngineFeature> _engineFeatures;

        public EngineContextFactory(
            ICompositionStrategy compositionStrategy,
            IEngineContainerFactory engineContainerFactory,
            IEnumerable<EngineFeature> engineFeatures)
        {
            _compositionStrategy = compositionStrategy;
            _engineContainerFactory = engineContainerFactory;
            _engineFeatures = engineFeatures;
        }

        public async Task<EngineContext> CreateContextAsync(EngineSettings settings)
        {
            var describedContext = await CreateDescribedContextAsync(settings, MinimumEngineDescriptor());

            EngineDescriptor currentDescriptor;
            using (var scope = describedContext.CreateServiceScope())
            {
                var descriptorManager = scope.ServiceProvider.GetService<IEngineDescriptorManager>();
                currentDescriptor = await descriptorManager.GetEngineDescriptorAsync();
            }

            return currentDescriptor != null
                ? await CreateDescribedContextAsync(settings, currentDescriptor)
                : describedContext;
        }

        public async Task<EngineContext> CreateDescribedContextAsync(EngineSettings settings, EngineDescriptor descriptor)
        {
            var schema = await _compositionStrategy.ComposeAsync(settings, descriptor);
            var provider = _engineContainerFactory.CreateContainer(settings, schema);

            return new EngineContext()
            {
                Settings = settings,
                Schema = schema,
                ServiceProvider = provider
            };
        }

        public async Task<EngineContext> CreateSetupContextAsync(EngineSettings settings)
        {
            var descriptor = MinimumEngineDescriptor();
            return await CreateDescribedContextAsync(settings, descriptor);
        }

        private EngineDescriptor MinimumEngineDescriptor()
        {
            return new EngineDescriptor
            {
                SerialNumber = string.Empty,
                Features = new List<EngineFeature>(_engineFeatures),
                Parameters = new List<EngineParameter>()
            };
        }
    }
}
