using System.Collections.Generic;
using System.Linq;

namespace Seed.Mvc.Models
{
    public class PagedResult<T>
    {
        public PagedResult()
        { }

        public PagedResult(IQueryable<T> query, int page, int count)
        {
            this.List = query.Skip((page - 1) * count).Take(count);
            this.Total = query.Count();
        }

        public IEnumerable<T> List { get; set; }

        public int Total { get; set; }
    }
}