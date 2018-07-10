using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine;
using System;
using System.Threading.Tasks;

namespace Seed.Modules.DeferredTasks
{
    public class DeferredTaskMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IEngineHost _engineHost;

        public DeferredTaskMiddleware(RequestDelegate next, IEngineHost engineHost)
        {
            _next = next;
            _engineHost = engineHost;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            await _next.Invoke(httpContext);

            var engineSettings = httpContext.Features.Get<EngineSettings>();

            if (engineSettings != null)
            {
                var deferredTaskEngine = httpContext.RequestServices.GetService<IDeferredTaskEngine>();

                if (deferredTaskEngine != null && deferredTaskEngine.HasPendingTasks)
                {
                    (httpContext.RequestServices as IDisposable).Dispose();

                    var engineContext = _engineHost.GetOrCreateEngineContext(engineSettings);

                    if (!engineContext.Released)
                    {
                        using (var scope = engineContext.EnterServiceScope())
                        {
                            await deferredTaskEngine.ExecuteTasksAsync(new DeferredTaskContext(scope.ServiceProvider));
                        }
                    }
                }
            }
        }
    }
}
