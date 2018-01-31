﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Newtonsoft.Json;
using Seed.Data.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Seed.Data
{
    public class DocumentDbSet<TEntity> : DbSet<TEntity> where TEntity : class
    {
        readonly DbSet<Document> _set;

        public DocumentDbSet(IDbContext dbContext)
        {
            _set = dbContext.Document;
        }

        public override EntityEntry<TEntity> Add(TEntity entity)
        {
            if (typeof(TEntity).HasIdProperty())
            {
                _set.Add(new Document(entity));
            }
            else
            {
                var document = _set.FirstOrDefault(e => e.Type == nameof(TEntity));
                document.Content = new Document(entity).Content;
            }
            return Attach(entity);
        }

        public override Task<EntityEntry<TEntity>> AddAsync(TEntity entity, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() => Add(entity), cancellationToken);
        }

        public override void AddRange(IEnumerable<TEntity> entities)
        {
            if (!typeof(TEntity).HasIdProperty())
            {
                throw new NotSupportedException("没有 Id 属性不能添加多条记录");
            }
            _set.AddRange(entities.Select(e => new Document(e)));
        }

        public override void AddRange(params TEntity[] entities)
        {
            if (entities != null)
                AddRange(entities.ToList());
        }

        public override Task AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default(CancellationToken))
        {
            if (!typeof(TEntity).HasIdProperty())
            {
                throw new NotSupportedException("没有 Id 属性不能添加多条记录");
            }
            return _set.AddRangeAsync(entities.Select(e => new Document(e)), cancellationToken);
        }

        public override Task AddRangeAsync(params TEntity[] entities)
        {
            if (!typeof(TEntity).HasIdProperty())
            {
                throw new NotSupportedException("没有 Id 属性不能添加多条记录");
            }
            return _set.AddRangeAsync(entities.Select(e => new Document(e)).ToArray());
        }

        public override TEntity Find(params object[] keyValues)
        {
            if (!typeof(TEntity).HasIdProperty())
            {
                return _set.FirstOrDefault(e => e.Type == nameof(TEntity)).ToEntity<TEntity>();
            }
            else
            {
                return _set.Find(keyValues).ToEntity<TEntity>();
            }
        }

        public override Task<TEntity> FindAsync(object[] keyValues, CancellationToken cancellationToken)
        {
            return Task.Run(() =>
            {
                return Find(keyValues);
            }, cancellationToken);
        }

        public override Task<TEntity> FindAsync(params object[] keyValues)
        {
            return Task.Run(() =>
            {
                return Find(keyValues);
            });
        }

        public override EntityEntry<TEntity> Remove(TEntity entity)
        {
            var document = !typeof(TEntity).HasIdProperty()
                ? _set.FirstOrDefault(e => e.Type == nameof(entity))
                : _set.Find(typeof(TEntity).GetProperty("Id").GetValue(entity));
            _set.Remove(document);
            return Attach(entity);
        }

        public override void RemoveRange(IEnumerable<TEntity> entities)
        {
            var entityType = typeof(TEntity);
            if (!entityType.HasIdProperty())
            {
                throw new NotSupportedException("没有 Id 属性不能移除多条记录");
            }
            var idProperty = entityType.GetProperty("Id");
            var ids = entities.Select(e => (int)idProperty.GetValue(e)).ToArray();
            var documents = _set.Where(e => ids.Contains(e.Id)).ToArray();
            _set.RemoveRange(documents);
        }

        public override void RemoveRange(params TEntity[] entities)
        {
            if (entities == null) return;
            RemoveRange(entities.ToList());
        }

        public override EntityEntry<TEntity> Update(TEntity entity)
        {
            var entityType = typeof(TEntity);
            var document = !typeof(TEntity).HasIdProperty()
                ? _set.FirstOrDefault(e => e.Type == nameof(TEntity))
                : _set.Find(entityType.GetIdValue(entity));
            document.Content = new Document(entity).Content;
            _set.Update(document);
            return Attach(entity);
        }

        public override void UpdateRange(IEnumerable<TEntity> entities)
        {
            var entityType = typeof(TEntity);
            if (!entityType.HasIdProperty())
            {
                throw new NotSupportedException("没有 Id 属性不能更新多条记录");
            }
            var idProperty = entityType.GetProperty("Id");
            var ids = entities.Select(e => (int)idProperty.GetValue(e)).ToArray();
            var documents = _set.Where(e => ids.Contains(e.Id)).ToDictionary(x => x.Id, y => y);
            foreach (var entity in entities)
            {
                documents[(int)idProperty.GetValue(entity)].Content = JsonConvert.SerializeObject(entity);
            }
            _set.UpdateRange(documents.Values);
        }

        public override void UpdateRange(params TEntity[] entities)
        {
            if (entities != null)
                UpdateRange(entities.ToList());
        }
    }
}
