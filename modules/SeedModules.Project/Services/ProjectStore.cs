using Seed.Data;
using Seed.Project;
using Seed.Project.Models;
using System;
using System.Threading.Tasks;

namespace SeedModules.Project.Services
{
    public class ProjectStore : IProjectStore
    {
        readonly IDbContext _dbContext;

        public ProjectStore(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task CreateAsync(ProjectResult projectResult)
        {
            _dbContext.Set<ProjectResult>().Add(projectResult);
            _dbContext.SaveChanges();
            return Task.CompletedTask;
        }

        public Task DeleteAsync(ProjectResult projectResult)
        {
            var set = _dbContext.Set<ProjectResult>();
            set.Remove(set.Find(projectResult.Id));
            _dbContext.SaveChanges();
            return Task.CompletedTask;
        }

        public Task<ProjectResult> FindByExecutionIdAsync(string executionId)
        {
            return _dbContext.Set<ProjectResult>().FindAsync(executionId);
        }

        public Task UpdateAsync(ProjectResult projectResult)
        {
            var set = _dbContext.Set<ProjectResult>();
            set.Update(projectResult);
            _dbContext.SaveChanges();
            return Task.CompletedTask;
        }
    }
}
