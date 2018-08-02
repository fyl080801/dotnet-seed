using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace Seed.Mvc.Models
{
    public interface IPagedResult<T>
    {
        IEnumerable<T> List { get; set; }

        int Total { get; set; }
    }
}
