using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Seed.Data;
using Seed.Environment.Engine.Descriptors;
using Seed.Environment.Engine.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Data
{
    public class EngineDescriptorManager : IEngineDescriptorManager
    {
        readonly EngineSettings _engineSettings;
        readonly IEnumerable<IEngineDescriptorManagerEventHandler> _engineDescriptorManagerEventHandlers;
        readonly IDbContext _dbContext;
        readonly ILogger _logger;

        EngineDescriptor _engineDescriptor;

        public EngineDescriptorManager(
            EngineSettings engineSettings,
            IEnumerable<IEngineDescriptorManagerEventHandler> engineDescriptorManagerEventHandlers,
            IDbContext dbContext,
            ILogger<EngineDescriptorManager> logger)
        {
            _engineSettings = engineSettings;
            _engineDescriptorManagerEventHandlers = engineDescriptorManagerEventHandlers;
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task<EngineDescriptor> GetEngineDescriptorAsync()
        {
            if (_engineDescriptor == null)
            {
                _engineDescriptor = await _dbContext.Set<EngineDescriptor>().FirstOrDefaultAsync();
            }

            return _engineDescriptor;
        }

        public async Task UpdateEngineDescriptorAsync(string priorSerialNumber, IEnumerable<EngineFeature> enabledFeatures, IEnumerable<EngineParameter> parameters)
        {
            var engineDescriptorRecord = await GetEngineDescriptorAsync();
            var serialNumber = engineDescriptorRecord == null ? DateTime.MinValue.ToString("yyyyMMddHHmmss") : engineDescriptorRecord.SerialNumber;
            if (priorSerialNumber != serialNumber)
            {
                throw new InvalidOperationException("错误的序列号");
            }

            var timeNumber = DateTime.Now.ToString("yyyyMMddHHmmss");
            if (engineDescriptorRecord == null)
            {
                engineDescriptorRecord = new EngineDescriptor { SerialNumber = timeNumber };
            }
            else
            {
                engineDescriptorRecord.SerialNumber = timeNumber;
            }

            engineDescriptorRecord.Features = enabledFeatures.ToList();
            engineDescriptorRecord.Parameters = parameters.ToList();

            _dbContext.Set<EngineDescriptor>().Add(engineDescriptorRecord);

            _dbContext.SaveChanges();

            _engineDescriptor = engineDescriptorRecord;

            await _engineDescriptorManagerEventHandlers.InvokeAsync(e => e.Changed(engineDescriptorRecord, _engineSettings.Name), _logger);
        }
    }
}
