using Microsoft.EntityFrameworkCore.Query.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Seed.Data
{
    public class DocumentQueryProvider<TEntity> : IAsyncQueryProvider
    {
        IQueryable<TEntity> _queryable;

        public DocumentQueryProvider(IQueryable<TEntity> queryable)
        {
            _queryable = queryable;
        }

        public IQueryable CreateQuery(Expression expression)
        {
            return _queryable.Provider.CreateQuery(expression);
        }

        public IQueryable<TElement> CreateQuery<TElement>(Expression expression)
        {
            return _queryable.Provider.CreateQuery<TElement>(expression);
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
    }
}
