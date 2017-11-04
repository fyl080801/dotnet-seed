using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Seed.Data
{
    public class DocumentDbSet<TEntity> : DbSet<TEntity> where TEntity : class
    {
        readonly IDbContext _dbContext;

        public DocumentDbSet(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public override EntityEntry<TEntity> Add(TEntity entity)
        {
            return base.Add(entity);
        }

        public override Task<EntityEntry<TEntity>> AddAsync(TEntity entity, CancellationToken cancellationToken = default(CancellationToken))
        {
            return base.AddAsync(entity, cancellationToken);
        }

        public override void AddRange(IEnumerable<TEntity> entities)
        {
            base.AddRange(entities);
        }

        public override void AddRange(params TEntity[] entities)
        {
            base.AddRange(entities);
        }

        public override Task AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default(CancellationToken))
        {
            return base.AddRangeAsync(entities, cancellationToken);
        }

        public override Task AddRangeAsync(params TEntity[] entities)
        {
            return base.AddRangeAsync(entities);
        }

        public override EntityEntry<TEntity> Attach(TEntity entity)
        {
            return base.Attach(entity);
        }

        public override void AttachRange(IEnumerable<TEntity> entities)
        {
            base.AttachRange(entities);
        }

        public override void AttachRange(params TEntity[] entities)
        {
            base.AttachRange(entities);
        }

        public override TEntity Find(params object[] keyValues)
        {
            return base.Find(keyValues);
        }

        public override Task<TEntity> FindAsync(object[] keyValues, CancellationToken cancellationToken)
        {
            return base.FindAsync(keyValues, cancellationToken);
        }

        public override Task<TEntity> FindAsync(params object[] keyValues)
        {
            return base.FindAsync(keyValues);
        }

        public override EntityEntry<TEntity> Remove(TEntity entity)
        {
            return base.Remove(entity);
        }

        public override void RemoveRange(IEnumerable<TEntity> entities)
        {
            base.RemoveRange(entities);
        }

        public override void RemoveRange(params TEntity[] entities)
        {
            base.RemoveRange(entities);
        }

        public override EntityEntry<TEntity> Update(TEntity entity)
        {
            return base.Update(entity);
        }

        public override void UpdateRange(IEnumerable<TEntity> entities)
        {
            base.UpdateRange(entities);
        }

        public override void UpdateRange(params TEntity[] entities)
        {
            base.UpdateRange(entities);
        }
    }
}
