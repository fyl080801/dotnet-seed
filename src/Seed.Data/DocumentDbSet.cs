using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Seed.Data
{
    public class DocumentDbSet<TEntity> : DbSet<TEntity> where TEntity : EntityBase
    {
        readonly IDbContext _dbContext;

        public DocumentDbSet(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public override EntityEntry<TEntity> Add(TEntity entity)
        {
            _dbContext.Document.Add(new Document(entity));
            return Attach(entity);
        }

        public override Task<EntityEntry<TEntity>> AddAsync(TEntity entity, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() => Add(entity), cancellationToken);
        }

        public override void AddRange(IEnumerable<TEntity> entities)
        {
            _dbContext.Document.AddRange(entities.Select(e => new Document(e)));
        }

        public override void AddRange(params TEntity[] entities)
        {
            _dbContext.Document.AddRange(entities.Select(e => new Document(e)).ToArray());
        }

        public override Task AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default(CancellationToken))
        {
            return _dbContext.Document.AddRangeAsync(entities.Select(e => new Document(e)), cancellationToken);
        }

        public override Task AddRangeAsync(params TEntity[] entities)
        {
            return _dbContext.Document.AddRangeAsync(entities.Select(e => new Document(e)).ToArray());
        }

        public override TEntity Find(params object[] keyValues)
        {
            return _dbContext.Document.Find(keyValues).ToEntity<TEntity>();
        }

        public override Task<TEntity> FindAsync(object[] keyValues, CancellationToken cancellationToken)
        {
            return Task.Run(() =>
            {
                return _dbContext.Document.Find(keyValues).ToEntity<TEntity>();
            }, cancellationToken);
        }

        public override Task<TEntity> FindAsync(params object[] keyValues)
        {
            return Task.Run(() =>
            {
                return _dbContext.Document.Find(keyValues).ToEntity<TEntity>();
            });
        }

        public override EntityEntry<TEntity> Remove(TEntity entity)
        {
            var document = _dbContext.Document.Find(entity.Id);
            _dbContext.Document.Remove(document);
            return Attach(entity);
        }

        public override void RemoveRange(IEnumerable<TEntity> entities)
        {
            var ids = entities.Select(e => e.Id).ToArray();
            var documents = _dbContext.Document.Where(e => ids.Contains(e.Id)).ToArray();
            _dbContext.Document.RemoveRange(documents);
        }

        public override void RemoveRange(params TEntity[] entities)
        {
            if (entities == null) return;
            RemoveRange(entities);
        }

        public override EntityEntry<TEntity> Update(TEntity entity)
        {
            var document = _dbContext.Document.Find(entity.Id);
            document.Content = entity.Properties.ToString();
            _dbContext.Document.Update(document);
            return Attach(entity);
        }

        public override void UpdateRange(IEnumerable<TEntity> entities)
        {
            var ids = entities.ToDictionary(k => k.Id, v => v);
            var documents = _dbContext.Document.Where(e => ids.Keys.Contains(e.Id)).ToDictionary(k => k.Id, v => v);
            foreach (var id in ids.Keys)
            {
                if (documents.ContainsKey(id))
                    documents[id].Content = ids[id].Properties.ToString();
            }
            _dbContext.Document.UpdateRange(documents.Values);
        }

        public override void UpdateRange(params TEntity[] entities)
        {
            if (entities != null)
                UpdateRange(entities);
        }
    }
}
