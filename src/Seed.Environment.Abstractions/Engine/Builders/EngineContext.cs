using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine.Builders.Models;
using Seed.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace Seed.Environment.Engine.Builders
{
    public class EngineContext : IDisposable
    {
        private bool _disposed = false;
        private volatile int _refCount = 0;
        private bool _released = false;
        private List<WeakReference<EngineContext>> _dependents;

        public EngineSettings Settings { get; set; }
        public EngineSchema Schema { get; set; }
        public IServiceProvider ServiceProvider { get; set; }

        public bool IsActivated { get; set; }

        public IServiceScope EnterServiceScope()
        {
            if (_disposed)
            {
                throw new InvalidOperationException("Can't use EnterServiceScope on a disposed context");
            }

            if (_released)
            {
                throw new InvalidOperationException("Can't use EnterServiceScope on a released context");
            }

            return new ServiceScopeWrapper(this);
        }

        public bool Released => _released;

        public int ActiveScopes => _refCount;

        public void Release()
        {
            if (_released == true)
            {
                return;
            }

            _released = true;

            lock (this)
            {
                if (_dependents == null)
                {
                    return;
                }

                foreach (var dependent in _dependents)
                {
                    if (dependent.TryGetTarget(out var engineContext))
                    {
                        engineContext.Release();
                    }
                }

                if (_refCount == 0)
                {
                    Dispose();
                }
            }
        }

        public void AddDependentEngine(EngineContext engineContext)
        {
            lock (this)
            {
                if (_dependents == null)
                {
                    _dependents = new List<WeakReference<EngineContext>>();
                }

                _dependents.RemoveAll(x => !x.TryGetTarget(out var engine) || engine.Settings.Name == engineContext.Settings.Name);

                _dependents.Add(new WeakReference<EngineContext>(engineContext));
            }
        }

        public void Dispose()
        {
            if (_disposed)
            {
                return;
            }

            if (ServiceProvider != null)
            {
                (ServiceProvider as IDisposable)?.Dispose();
                ServiceProvider = null;
            }

            IsActivated = false;
            Settings = null;
            Schema = null;

            _disposed = true;

            GC.SuppressFinalize(this);
        }

        ~EngineContext()
        {
            Dispose();
        }

        internal class ServiceScopeWrapper : IServiceScope
        {
            private readonly EngineContext _engineContext;
            private readonly IServiceScope _serviceScope;
            private readonly IServiceProvider _existingServices;
            private readonly HttpContext _httpContext;

            public ServiceScopeWrapper(EngineContext engineContext)
            {
                Interlocked.Increment(ref engineContext._refCount);

                _engineContext = engineContext;
                _serviceScope = engineContext.ServiceProvider.CreateScope();
                ServiceProvider = _serviceScope.ServiceProvider;

                var httpContextAccessor = ServiceProvider.GetRequiredService<IHttpContextAccessor>();

                if (httpContextAccessor.HttpContext == null)
                {
                    httpContextAccessor.HttpContext = new DefaultHttpContext();
                }

                _httpContext = httpContextAccessor.HttpContext;
                _existingServices = _httpContext.RequestServices;
                _httpContext.RequestServices = ServiceProvider;
            }

            public IServiceProvider ServiceProvider { get; }

            private bool ScopeReleased()
            {
                var refCount = Interlocked.Decrement(ref _engineContext._refCount);

                if (_engineContext._released && refCount == 0)
                {
                    var tenantEvents = _serviceScope.ServiceProvider.GetServices<IModuleTenantEvents>();

                    foreach (var tenantEvent in tenantEvents)
                    {
                        tenantEvent.TerminatingAsync().GetAwaiter().GetResult();
                    }

                    foreach (var tenantEvent in tenantEvents.Reverse())
                    {
                        tenantEvent.TerminatedAsync().GetAwaiter().GetResult();
                    }

                    return true;
                }

                return false;
            }

            public void Dispose()
            {
                var disposeEngineContext = ScopeReleased();

                _httpContext.RequestServices = _existingServices;
                _serviceScope.Dispose();

                GC.SuppressFinalize(this);

                if (disposeEngineContext)
                {
                    _engineContext.Dispose();
                }
            }

            ~ServiceScopeWrapper()
            {
                Dispose();
            }
        }
    }
}
