using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;

namespace Seed.Data
{
    public class DocumentDbSet<TEntity> : DbSet<TEntity>, IQueryable<TEntity>, IAsyncEnumerableAccessor<TEntity>, IInfrastructure<IServiceProvider>
        where TEntity : class
    {
        readonly IDbContext _dbContext;
        readonly DbSet<Document> _document;
        readonly Type _entityType;
        readonly IEnumerable<PropertyInfo> _keyCollection;

        LocalView<TEntity> _local;

        public DocumentDbSet(IDbContext dbContext)
        {
            _dbContext = dbContext;
            _document = dbContext.Set<Document>();
            _entityType = typeof(TEntity);
            _keyCollection = _entityType.GetProperties()
                .Where(e => e.GetCustomAttributes(typeof(KeyAttribute), true).Length > 0)
                .AsEnumerable();
        }

        public override LocalView<TEntity> Local
            => _local ?? (_local = new LocalView<TEntity>(this));

        public override EntityEntry<TEntity> Attach(TEntity entity)
        {
            throw new NotSupportedException($"未映射的实体类型 {_entityType.FullName} 不能 Attach");
        }

        public override void AttachRange(IEnumerable<TEntity> entities)
        {
            throw new NotSupportedException($"未映射的实体类型 {_entityType.FullName} 不能 Attach");
        }

        public override void AttachRange(params TEntity[] entities)
        {
            throw new NotSupportedException($"未映射的实体类型 {_entityType.FullName} 不能 Attach");
        }

        public override EntityEntry<TEntity> Add(TEntity entity)
        {
            var documents = GetQueryableEntities().ToList();
            documents.Add(entity);
            UpdateDocument(documents);
            return null;
        }

        public override Task<EntityEntry<TEntity>> AddAsync(TEntity entity, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() => Add(entity), cancellationToken);
        }

        public override void AddRange(IEnumerable<TEntity> entities)
        {
            var documents = GetQueryableEntities().ToList();
            documents.AddRange(entities);
            UpdateDocument(documents);
        }

        public override void AddRange(params TEntity[] entities)
        {
            AddRange((entities ?? new TEntity[0]).AsEnumerable());
        }

        public override Task AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() => AddRange(entities), cancellationToken);
        }

        public override Task AddRangeAsync(params TEntity[] entities)
        {
            return AddRangeAsync((entities ?? new TEntity[0]).AsEnumerable());
        }

        public override TEntity Find(params object[] keyValues)
        {
            var documents = GetQueryableEntities().ToList();
            return documents.Find(e =>
            {
                bool isContain = false;
                foreach (var key in _keyCollection)
                {
                    foreach (var val in keyValues)
                    {
                        isContain = key.GetValue(e) == val;
                        if (isContain)
                        {
                            return isContain;
                        }
                    }
                }
                return isContain;
            });
        }

        public override Task<TEntity> FindAsync(object[] keyValues, CancellationToken cancellationToken)
        {
            return Task.Run(() => Find(keyValues), cancellationToken);
        }

        public override Task<TEntity> FindAsync(params object[] keyValues)
        {
            return FindAsync(keyValues ?? new object[0], default(CancellationToken));
        }

        public override EntityEntry<TEntity> Remove(TEntity entity)
        {
            var documents = GetQueryableEntities().ToList();
            var oldItem = documents.Find(e => e.Equals(entity));
            documents.Remove(oldItem);
            UpdateDocument(documents);
            return null;
        }

        public override void RemoveRange(IEnumerable<TEntity> entities)
        {
            var documents = GetQueryableEntities().ToList();
            var removes = documents.Where(e => entities.Contains(e));
            foreach (var entity in removes)
            {
                documents.Remove(entity);
            }
            UpdateDocument(documents);
        }

        public override void RemoveRange(params TEntity[] entities)
        {
            RemoveRange((entities ?? new TEntity[0]).AsEnumerable());
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

        private Document GetDocument()
        {
            var typeName = typeof(TEntity).FullName;
            return _document.Where(e => e.Type == typeName).FirstOrDefault() ?? new Document()
            {
                Content = "[]",
                Type = typeName
            };
        }

        private IQueryable<TEntity> GetQueryableEntities()
        {
            return JsonConvert.DeserializeObject<TEntity[]>(GetDocument().Content).AsQueryable();
        }

        private void UpdateDocument(IEnumerable<TEntity> entities)
        {
            var typeName = typeof(TEntity).FullName;
            var content = JsonConvert.SerializeObject(entities.ToArray());
            var document = _document.Where(e => e.Type == typeName).FirstOrDefault();
            if (document == null)
            {
                document = new Document()
                {
                    Content = content,
                    Type = typeName
                };
                _document.Add(document);
            }
            else
            {
                document.Content = content;
            }
        }

        IAsyncEnumerable<TEntity> IAsyncEnumerableAccessor<TEntity>.AsyncEnumerable
            => GetQueryableEntities().ToAsyncEnumerable();

        Type IQueryable.ElementType
            => typeof(TEntity);

        Expression IQueryable.Expression
            => GetQueryableEntities().Expression;

        IQueryProvider IQueryable.Provider
            => new DocumentQueryProvider<TEntity>(GetQueryableEntities());

        IServiceProvider IInfrastructure<IServiceProvider>.Instance
            => _dbContext.Context.GetInfrastructure();

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetQueryableEntities().GetEnumerator();
        }

        IEnumerator<TEntity> IEnumerable<TEntity>.GetEnumerator()
        {
            return GetQueryableEntities().GetEnumerator();
        }
    }
}
