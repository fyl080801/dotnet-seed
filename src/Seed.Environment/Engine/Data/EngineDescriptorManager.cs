﻿using Microsoft.EntityFrameworkCore;
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
        readonly DbSet<EngineDescriptor> _engineDescriptorSet;
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
            _engineDescriptorSet = dbContext.Set<EngineDescriptor>();
            _logger = logger;
        }

        public async Task<EngineDescriptor> GetEngineDescriptorAsync()
        {
            if (_engineDescriptor == null)
            {
                _engineDescriptor = await Task.FromResult(_engineDescriptorSet.FirstOrDefault());
            }

            return _engineDescriptor;
        }

        public async Task UpdateEngineDescriptorAsync(int priorSerialNumber, IEnumerable<EngineFeature> enabledFeatures, IEnumerable<EngineParameter> parameters)
        {
            var engineDescriptorRecord = await GetEngineDescriptorAsync();
            var serialNumber = engineDescriptorRecord == null ? 0 : engineDescriptorRecord.SerialNumber;
            if (priorSerialNumber != serialNumber)
            {
                throw new InvalidOperationException("错误的序列号");
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

            if (engineDescriptorRecord.Id <= 0)
            {
                _engineDescriptorSet.Add(engineDescriptorRecord);
            }
            else
            {
                _engineDescriptorSet.Update(engineDescriptorRecord);
            }

            _dbContext.SaveChanges();

            _engineDescriptor = engineDescriptorRecord;

            await _engineDescriptorManagerEventHandlers.InvokeAsync(e => e.Changed(engineDescriptorRecord, _engineSettings.Name), _logger);
        }
    }
}
