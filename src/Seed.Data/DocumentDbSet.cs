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
using Newtonsoft.Json.Linq;

namespace Seed.Data
{
    /// <summary>
    /// 实现读取序列化数据的 DbSet
    /// </summary>
    /// <remarks>
    /// 不支持直接使用异步方法（FirstOrDefaultAsync 之类的）
    /// </remarks>
    public class DocumentDbSet<TEntity> : DbSet<TEntity>, IQueryable<TEntity>, IAsyncEnumerableAccessor<TEntity>, IInfrastructure<IServiceProvider>
        where TEntity : class
    {
        readonly DbSet<Document> _document;
        readonly Type _entityType;
        readonly Type _documentType = typeof(Document);
        readonly IEnumerable<PropertyInfo> _keyCollection;
        readonly IQueryable<Document> _documentQuery;

        IQueryable<TEntity> _entityQuery;
        LocalView<TEntity> _local;

        public DocumentDbSet(IDbContext dbContext)
        {
            _document = dbContext.Document;
            _entityType = typeof(TEntity);
            _documentQuery = _document.Where(e => e.Type == _entityType.ToString());

            var documentKeys = typeof(Document).GetProperties()
                .Where(e => e.GetCustomAttributes(typeof(KeyAttribute), true).Length > 0)
                .AsEnumerable();

            _keyCollection = _entityType.GetProperties()
                .Where(e => e.GetCustomAttributes(typeof(KeyAttribute), true).Length > 0 && documentKeys.Any(x => x.Name == e.Name && x.PropertyType == e.PropertyType))
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
            _document.Add(new Document()
            {
                Type = _entityType.ToString(),
                Content = JsonConvert.SerializeObject(entity)
            });
            return null;
        }

        public override Task<EntityEntry<TEntity>> AddAsync(TEntity entity, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() => Add(entity), cancellationToken);
        }

        public override void AddRange(IEnumerable<TEntity> entities)
        {
            foreach (var entity in entities)
            {
                Add(entity);
            }
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
            var document = _document.Find(keyValues);
            return document == null ? null : ResolveKeyValue(document, JsonConvert.DeserializeObject<TEntity>(document.Content));
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
            var keys = _keyCollection.Select(e => e.GetValue(entity)).ToArray();
            var document = _document.Find(keys);
            _document.Remove(document);
            return null;
        }

        public override void RemoveRange(IEnumerable<TEntity> entities)
        {
            foreach (var entity in entities)
            {
                Remove(entity);
            }
        }

        public override void RemoveRange(params TEntity[] entities)
        {
            RemoveRange((entities ?? new TEntity[0]).AsEnumerable());
        }

        public override EntityEntry<TEntity> Update(TEntity entity)
        {
            var keys = _keyCollection.Select(e => e.GetValue(entity)).ToArray();
            var document = _document.Find(keys);
            document.Content = JsonConvert.SerializeObject(entity);
            _document.Update(document);
            return null;
        }

        public override void UpdateRange(IEnumerable<TEntity> entities)
        {
            foreach (var entity in entities)
            {
                Update(entity);
            }
        }

        public override void UpdateRange(params TEntity[] entities)
        {
            RemoveRange((entities ?? new TEntity[0]).AsEnumerable());
        }

        private IQueryable<TEntity> GetEntityQuery()
        {
            return _documentQuery.ToArray()
                .Select(e => ResolveKeyValue(e, JsonConvert.DeserializeObject<TEntity>(e.Content)))
                .AsQueryable();
        }

        private TEntity ResolveKeyValue(Document document, TEntity entity)
        {
            foreach (var key in _keyCollection)
            {
                key.SetValue(entity, _documentType.GetProperty(key.Name).GetValue(document));
            }
            return entity;
        }

        private IQueryable<TEntity> EntityQuery
            => _entityQuery ?? (_entityQuery = GetEntityQuery());

        public Type ElementType
            => _entityType;

        public IAsyncEnumerable<TEntity> AsyncEnumerable
            => EntityQuery.ToAsyncEnumerable();

        public IQueryProvider Provider
            => EntityQuery.Provider;

        public Expression Expression
            => EntityQuery.Expression;

        public IServiceProvider Instance
            => _document.GetInfrastructure();

        public IEnumerator<TEntity> GetEnumerator()
        {
            return EntityQuery.GetEnumerator();
        }
    }
}
