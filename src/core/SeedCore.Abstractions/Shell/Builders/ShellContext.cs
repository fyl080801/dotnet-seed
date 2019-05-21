using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using SeedCore.Modules;
using SeedCore.Shell.Builders.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace SeedCore.Shell.Builders
{
    public class ShellContext : IDisposable
    {
        private bool _disposed = false;
        private volatile int _refCount = 0;
        private bool _released = false;
        private List<WeakReference<ShellContext>> _dependents;
        private object _synLock = new object();

        public ShellSettings Settings { get; set; }
        public ShellBlueprint Blueprint { get; set; }
        public IServiceProvider ServiceProvider { get; set; }

        public bool IsActivated { get; set; }

        public RequestDelegate Pipeline { get; set; }

        private bool _placeHolder;

        public class PlaceHolder : ShellContext
        {
            public PlaceHolder()
            {
                _placeHolder = true;
                _released = true;
                _disposed = true;
            }
        }

        public IServiceScope CreateScope()
        {
            if (_placeHolder)
            {
                return null;
            }

            var scope = new ServiceScopeWrapper(this);

            if (!_released)
            {
                return scope;
            }

            scope.Dispose();

            return null;
        }

        public bool Released => _released;

        public int ActiveScopes => _refCount;

        public void Release()
        {
            if (_released == true)
            {
                return;
            }

            lock (_synLock)
            {
                if (_released == true)
                {
                    return;
                }

                _released = true;

                if (_dependents != null)
                {

                    foreach (var dependent in _dependents)
                    {
                        if (dependent.TryGetTarget(out var shellContext))
                        {
                            shellContext.Release();
                        }
                    }
                }

                if (_refCount == 0)
                {
                    Dispose();
                }
            }
        }

        public void AddDependentShell(ShellContext shellContext)
        {
            if (shellContext.Released)
            {
                return;
            }

            if (_released)
            {
                shellContext.Release();
                return;
            }

            lock (_synLock)
            {
                if (_dependents == null)
                {
                    _dependents = new List<WeakReference<ShellContext>>();
                }

                _dependents.RemoveAll(x => !x.TryGetTarget(out var shell) || shell.Settings.Name == shellContext.Settings.Name);

                _dependents.Add(new WeakReference<ShellContext>(shellContext));
            }
        }

        public void Dispose()
        {
            Close();
            GC.SuppressFinalize(this);
        }

        public void Close()
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
            Blueprint = null;
            Pipeline = null;

            _disposed = true;
        }

        ~ShellContext()
        {
            Close();
        }

        internal class ServiceScopeWrapper : IServiceScope
        {
            private readonly ShellContext _shellContext;
            private readonly IServiceScope _serviceScope;
            private readonly IServiceProvider _existingServices;
            private readonly HttpContext _httpContext;

            public ServiceScopeWrapper(ShellContext shellContext)
            {
                Interlocked.Increment(ref shellContext._refCount);

                _shellContext = shellContext;

                if (_shellContext.ServiceProvider == null)
                {
                    throw new ArgumentNullException(nameof(shellContext.ServiceProvider), $"Can't resolve a scope on tenant: {shellContext.Settings.Name}");
                }

                _serviceScope = shellContext.ServiceProvider.CreateScope();
                ServiceProvider = _serviceScope.ServiceProvider;

                var httpContextAccessor = ServiceProvider.GetRequiredService<IHttpContextAccessor>();

                _httpContext = httpContextAccessor.HttpContext;
                _existingServices = _httpContext.RequestServices;
                _httpContext.RequestServices = ServiceProvider;
            }

            public IServiceProvider ServiceProvider { get; }

            private bool ScopeReleased()
            {
                if (_shellContext.Settings.State == TenantState.Disabled)
                {
                    if (Interlocked.CompareExchange(ref _shellContext._refCount, 1, 1) == 1)
                    {
                        _shellContext.Release();
                    }
                }

                if (_shellContext._released && Interlocked.CompareExchange(ref _shellContext._refCount, 1, 1) == 1)
                {
                    var tenantEvents = _serviceScope.ServiceProvider.GetServices<IModularTenantEvents>();

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
                var disposeShellContext = ScopeReleased();

                _httpContext.RequestServices = _existingServices;
                _serviceScope.Dispose();

                if (disposeShellContext)
                {
                    _shellContext.Dispose();
                }

                Interlocked.Decrement(ref _shellContext._refCount);
            }
        }
    }
}
