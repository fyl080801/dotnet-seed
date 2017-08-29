using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;

namespace Seed.Environment.Abstractions.Engine
{
    public class EngineContext : IDisposable
    {
        bool _disposed = false;
        int _refCount = 0;
        bool _released = false;

        public EngineSettings Settings { get; set; }

        public EngineSchema Schema { get; set; }

        public IServiceProvider ServiceProvider { get; set; }

        public bool IsActivated { get; set; }

        public bool Released
        {
            get { return _released; }
        }

        public int ActiveRequests
        {
            get { return _refCount; }
        }

        public IServiceScope CreateServiceScope()
        {
            if (_disposed) throw new InvalidOperationException("context disposed");

            if (_released) throw new InvalidOperationException("context released");

            return ServiceProvider.CreateScope();
        }

        public void RequestStarted()
        {
            Interlocked.Increment(ref _refCount);
        }

        public void RequestEnded()
        {
            var refCount = Interlocked.Decrement(ref _refCount);

            if (_released && refCount == 0)
            {
                Dispose();
            }
        }

        public void Release()
        {
            _released = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {

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
            }
        }

        ~EngineContext()
        {
            Dispose(false);
        }
    }
}
