﻿using Microsoft.EntityFrameworkCore;
using Seed.Data;
using Seed.Project.Domain;
using System.Threading.Tasks;

namespace Seed.Project
{
    public class ProjectStore : IProjectStore
    {
        readonly IDbContext _dbContext;
        readonly DbSet<ProjectResult> _dbSet;

        public ProjectStore(IDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = dbContext.Set<ProjectResult>();
        }

        public Task<ProjectResult> CreateAsync(ProjectResult projectResult)
        {
            _dbSet.Add(projectResult);
            _dbContext.SaveChanges();
            return Task.FromResult(projectResult);
        }

        public Task DeleteAsync(ProjectResult projectResult)
        {
            _dbSet.Remove(_dbSet.Find(projectResult.Id));
            _dbContext.SaveChanges();
            return Task.CompletedTask;
        }

        public Task<ProjectResult> FindByExecutionIdAsync(string executionId)
        {
            return _dbSet.FindAsync(executionId);
        }

        public Task UpdateAsync(ProjectResult projectResult)
        {
            _dbSet.Update(projectResult);
            _dbContext.SaveChanges();
            return Task.CompletedTask;
        }
    }
}
