using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Remotion.Linq;

namespace Seed.Data
{
    public class DocumentQuery<TResult> : QueryableBase<TResult>, IAsyncEnumerable<TResult>, IListSource
    {
        public DocumentQuery(IQueryProvider provider) : base(provider)
        {
        }

        public DocumentQuery(IQueryProvider provider, Expression expression) : base(provider, expression)
        {
        }

        public bool ContainsListCollection => false;

        public IList GetList()
        {
            throw new System.NotImplementedException();
        }

        IAsyncEnumerator<TResult> IAsyncEnumerable<TResult>.GetEnumerator()
        {
            return ((IAsyncQueryProvider)Provider).ExecuteAsync<TResult>(Expression).GetEnumerator();
        }
    }
}