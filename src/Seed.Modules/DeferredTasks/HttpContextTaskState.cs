using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Modules.DeferredTasks
{
    public class HttpContextTaskState : IDeferredTaskState
    {
        readonly static object DeferredTaskKey = typeof(HttpContextTaskState);
        readonly HttpContext _httpContext;

        public IList<Func<DeferredTaskContext, Task>> Tasks
        {
            get
            {
                if (!_httpContext.Items.TryGetValue(DeferredTaskKey, out object tasks))
                {
                    tasks = new List<Func<DeferredTaskContext, Task>>();
                    _httpContext.Items.Add(DeferredTaskKey, tasks);
                }
                return (IList<Func<DeferredTaskContext, Task>>)tasks;
            }
        }

        public HttpContextTaskState(IHttpContextAccessor httpContextAccessor)
        {
            _httpContext = httpContextAccessor.HttpContext;
        }
    }
}