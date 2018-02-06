using Microsoft.EntityFrameworkCore;
using Seed.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Data
{
    public class EngineStateManager : IEngineStateManager
    {
        EngineState _state;
        readonly IDbContext _dbContext;

        public EngineStateManager(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<EngineState> GetEngineStateAsync()
        {
            if (_state != null)
            {
                return _state;
            }

            _state = await Task.FromResult(_dbContext.Set<EngineState>().FirstOrDefault());

            if (_state == null)
            {
                _state = new EngineState();
                UpdateEngineState();
            }

            return _state;
        }

        public async Task UpdateEnabledStateAsync(EngineFeatureState featureState, EngineFeatureState.State value)
        {
            var previousFeatureState = await GetOrCreateFeatureStateAsync(featureState.Id);

            previousFeatureState.EnableState = value;
            featureState.EnableState = value;

            UpdateEngineState();
        }

        public async Task UpdateInstalledStateAsync(EngineFeatureState featureState, EngineFeatureState.State value)
        {
            var previousFeatureState = await GetOrCreateFeatureStateAsync(featureState.Id);

            previousFeatureState.InstallState = value;
            featureState.InstallState = value;

            UpdateEngineState();
        }

        private async Task<EngineFeatureState> GetOrCreateFeatureStateAsync(string id)
        {
            var state = await GetEngineStateAsync();
            var featureState = state.Features.FirstOrDefault(x => x.Id == id);

            if (featureState == null)
            {
                featureState = new EngineFeatureState() { Id = id };
                _state.Features.Add(featureState);
            }

            return featureState;
        }

        private void UpdateEngineState()
        {
            _dbContext.SaveChanges();
        }
    }
}
