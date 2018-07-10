using Microsoft.Extensions.Logging;
using Seed.Data;
using Seed.Environment.Engine.Descriptor;
using Seed.Environment.Engine.Descriptor.Models;
using Seed.Modules.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Data
{
    public class EngineDescriptorManager : IEngineDescriptorManager
    {
        private readonly EngineSettings _engineSettings;
        private readonly IEnumerable<EngineFeature> _alwaysEnabledFeatures;
        private readonly IEnumerable<IEngineDescriptorManagerEventHandler> _engineDescriptorManagerEventHandlers;
        private readonly IDbContext _db;
        private readonly ILogger _logger;
        private EngineDescriptor _engineDescriptor;

        public EngineDescriptorManager(
            EngineSettings engineSettings,
            IEnumerable<EngineFeature> engineFeatures,
            IEnumerable<IEngineDescriptorManagerEventHandler> engineDescriptorManagerEventHandlers,
            IDbContext db,
            ILogger<EngineDescriptorManager> logger)
        {
            _engineSettings = engineSettings;
            _alwaysEnabledFeatures = engineFeatures.Where(f => f.AlwaysEnabled).ToArray();
            _engineDescriptorManagerEventHandlers = engineDescriptorManagerEventHandlers;
            _db = db;
            _logger = logger;
        }

        public async Task<EngineDescriptor> GetEngineDescriptorAsync()
        {
            if (_engineDescriptor == null)
            {
                _engineDescriptor = await Task.FromResult(_db.Set<EngineDescriptor>().FirstOrDefault());

                if (_engineDescriptor != null)
                {
                    _engineDescriptor.Features = _alwaysEnabledFeatures.Concat(
                        _engineDescriptor.Features).Distinct().ToList();
                }
            }

            return _engineDescriptor;
        }

        public async Task UpdateEngineDescriptorAsync(int priorSerialNumber, IEnumerable<EngineFeature> enabledFeatures, IEnumerable<EngineParameter> parameters)
        {
            var engineDescriptorRecord = await GetEngineDescriptorAsync();
            var serialNumber = engineDescriptorRecord == null ? 0 : engineDescriptorRecord.SerialNumber;
            if (priorSerialNumber != serialNumber)
            {
                throw new InvalidOperationException("Invalid serial number for engine descriptor");
            }

            if (_logger.IsEnabled(LogLevel.Information))
            {
                _logger.LogInformation("Updating engine descriptor for tenant '{TenantName}' ...", _engineSettings.Name);
            }

            if (engineDescriptorRecord == null)
            {
                engineDescriptorRecord = new EngineDescriptor { SerialNumber = 1 };
            }
            else
            {
                engineDescriptorRecord.SerialNumber++;
            }

            engineDescriptorRecord.Features = enabledFeatures.ToList();
            engineDescriptorRecord.Parameters = parameters.ToList();

            if (_logger.IsEnabled(LogLevel.Information))
            {
                _logger.LogInformation("Engine descriptor updated for tenant '{TenantName}'.", _engineSettings.Name);
            }

            _db.SaveChanges();

            _engineDescriptor = engineDescriptorRecord;

            await _engineDescriptorManagerEventHandlers.InvokeAsync(e => e.Changed(engineDescriptorRecord, _engineSettings.Name), _logger);
        }
    }
}