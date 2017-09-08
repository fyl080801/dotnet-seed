using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine.Builder;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;

namespace Seed.Environment.Engine
{
    /// <summary>
    /// 
    /// </summary>
    public class EngineContext : IDisposable
    {
        bool _disposed = false;
        int _refCount = 0;
        bool _released = false;

        public EngineSettings Settings { get; set; }

        public EngineSchema Schema { get; set; }

        public IServiceProvider ServiceProvider { get; set; }

        /// <summary>
        /// 是否活动
        /// </summary>
        public bool IsActivated { get; set; }

        /// <summary>
        /// 是否释放
        /// </summary>
        public bool Released
        {
            get { return _released; }
        }

        /// <summary>
        /// 活动请求数
        /// </summary>
        public int ActiveRequests
        {
            get { return _refCount; }
        }

        /// <summary>
        /// 创建 Engine 请求的作用域
        /// </summary>
        /// <returns></returns>
        /// <remarks>
        /// 已释放或已清理的不可创建作用域
        /// </remarks>
        public IServiceScope CreateServiceScope()
        {
            if (_disposed) throw new InvalidOperationException("context disposed");

            if (_released) throw new InvalidOperationException("context released");

            return ServiceProvider.CreateScope();
        }

        /// <summary>
        /// 接收到请求后执行
        /// </summary>
        public void RequestStarted()
        {
            Interlocked.Increment(ref _refCount);
        }

        /// <summary>
        /// 请求结束后执行
        /// </summary>
        public void RequestEnded()
        {
            var refCount = Interlocked.Decrement(ref _refCount);

            if (_released && refCount == 0)
            {
                Dispose();
            }
        }

        /// <summary>
        /// 
        /// </summary>
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
