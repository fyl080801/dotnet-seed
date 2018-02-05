using Microsoft.EntityFrameworkCore.Query.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Reflection;
using Newtonsoft.Json;

namespace Seed.Data
{
    public class DocumentQueryProvider<TEntity> : IAsyncQueryProvider where TEntity : class
    {
        IQueryable<Document> _queryable;
        IEnumerable<PropertyInfo> _keyCollection;
        Type _documentType;

        public DocumentQueryProvider(IQueryable<Document> queryable, IEnumerable<PropertyInfo> keyCollection)
        {
            _queryable = queryable;
            _keyCollection = keyCollection;
            _documentType = typeof(Document);
        }

        public IQueryable CreateQuery(Expression expression)
        {
            return _queryable.Select(e => ResolveKeyValue(e, JsonConvert.DeserializeObject<TEntity>(e.Content))).ToArray().AsQueryable().Provider.CreateQuery(expression);
        }

        public IQueryable<TElement> CreateQuery<TElement>(Expression expression)
        {
            throw new NotImplementedException();
        }

        public object Execute(Expression expression)
        {
            return _queryable.Provider.Execute(expression);
        }

        public TResult Execute<TResult>(Expression expression)
        {
            return _queryable.Provider.Execute<TResult>(expression);
        }

        public IAsyncEnumerable<TResult> ExecuteAsync<TResult>(Expression expression)
        {
            return CreateQuery<TResult>(expression).ToAsyncEnumerable();
        }

        public Task<TResult> ExecuteAsync<TResult>(Expression expression, CancellationToken cancellationToken)
        {
            return Task.Run(() => Execute<TResult>(expression), cancellationToken);
        }

        private TEntity ResolveKeyValue(Document document, TEntity entity)
        {
            foreach (var key in _keyCollection)
            {
                key.SetValue(entity, _documentType.GetProperty(key.Name).GetValue(document));
            }
            return entity;
        }
    }
}
