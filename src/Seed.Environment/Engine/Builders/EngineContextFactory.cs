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
                _logger.LogInformation($"为租户 '{settings.Name}' 创建上下文环境");
            }

            var describedContext = await CreateDescribedContextAsync(settings, MinimumEngineDescriptor());

            EngineDescriptor currentDescriptor;
            using (var scope = describedContext.EnterServiceScope())
            {
                var engineDescriptorManager = scope.ServiceProvider.GetService<IEngineDescriptorManager>();
                currentDescriptor = await engineDescriptorManager.GetEngineDescriptorAsync();
            }

            if (currentDescriptor != null)
            {
                return await CreateDescribedContextAsync(settings, currentDescriptor);
            }

            return describedContext;
        }

        async Task<EngineContext> IEngineContextFactory.CreateSetupContextAsync(EngineSettings settings)
        {
            if (_logger.IsEnabled(LogLevel.Debug))
            {
                _logger.LogDebug("未设置任何运行环境. 创建一个安装环境");
            }

            return await CreateDescribedContextAsync(settings, MinimumEngineDescriptor());
        }

        public async Task<EngineContext> CreateDescribedContextAsync(EngineSettings settings, EngineDescriptor engineDescriptor)
        {
            if (_logger.IsEnabled(LogLevel.Debug))
            {
                _logger.LogDebug("Creating described context for tenant '{TenantName}'", settings.Name);
            }

            var schema = await _compositionStrategy.ComposeAsync(settings, engineDescriptor);
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
