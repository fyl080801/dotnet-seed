using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Seed.Environment.Engine.Descriptor;
using Seed.Environment.Engine.Descriptor.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Builders
{
    public class EngineContextFactory : IEngineContextFactory
    {
        private readonly ICompositionStrategy _compositionStrategy;
        private readonly IEngineContainerFactory _engineContainerFactory;
        private readonly IEnumerable<EngineFeature> _engineFeatures;
        private readonly ILogger _logger;

        public EngineContextFactory(
            ICompositionStrategy compositionStrategy,
            IEngineContainerFactory engineContainerFactory,
            IEnumerable<EngineFeature> engineFeatures,
            ILogger<EngineContextFactory> logger)
        {
            _compositionStrategy = compositionStrategy;
            _engineContainerFactory = engineContainerFactory;
            _engineFeatures = engineFeatures;
            _logger = logger;
        }

        async Task<EngineContext> IEngineContextFactory.CreateEngineContextAsync(EngineSettings settings)
        {
            if (_logger.IsEnabled(LogLevel.Information))
            {
                _logger.LogInformation("为租户创建上下文 '{TenantName}'", settings.Name);
            }

            var describedContext = await CreateDescribedContextAsync(settings, MinimumEngineDescriptor());

            EngineDescriptor currentDescriptor;
            using (var scope = describedContext.ServiceProvider.CreateScope())
            {
                var engineDescriptorManager = scope.ServiceProvider.GetService<IEngineDescriptorManager>();
                currentDescriptor = await engineDescriptorManager.GetEngineDescriptorAsync();
            }

            if (currentDescriptor != null)
            {
                describedContext.Release();
                return await CreateDescribedContextAsync(settings, currentDescriptor);
            }

            return describedContext;
        }

        async Task<EngineContext> IEngineContextFactory.CreateSetupContextAsync(EngineSettings settings)
        {
            if (_logger.IsEnabled(LogLevel.Debug))
            {
                _logger.LogDebug("No engine settings available. Creating engine context for setup");
            }
            var descriptor = MinimumEngineDescriptor();

            return await CreateDescribedContextAsync(settings, descriptor);
        }

        public async Task<EngineContext> CreateDescribedContextAsync(EngineSettings settings, EngineDescriptor shellDescriptor)
        {
            if (_logger.IsEnabled(LogLevel.Debug))
            {
                _logger.LogDebug("为租户创建描述上下文 '{TenantName}'", settings.Name);
            }

            var schema = await _compositionStrategy.ComposeAsync(settings, shellDescriptor);
            var provider = _engineContainerFactory.CreateContainer(settings, schema);

            return new EngineContext
            {
                Settings = settings,
                Schema = schema,
                ServiceProvider = provider
            };
        }

        private EngineDescriptor MinimumEngineDescriptor()
        {
            return new EngineDescriptor
            {
                SerialNumber = 0,
                Features = new List<EngineFeature>(_engineFeatures),
                Parameters = new List<EngineParameter>()
            };
        }
    }
}
