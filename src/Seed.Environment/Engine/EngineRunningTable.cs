using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class EngineRunningTable : IEngineRunningTable
    {
        private readonly Dictionary<string, EngineEnvironment> _enginesByHostAndPrefix = new Dictionary<string, EngineEnvironment>(StringComparer.OrdinalIgnoreCase);
        private readonly ReaderWriterLockSlim _lock = new ReaderWriterLockSlim();

        private EngineEnvironment _single;
        private EngineEnvironment _default;

        public void Add(EngineEnvironment environment)
        {
            _lock.EnterWriteLock();
            try
            {
                if (_single != null)
                {
                    _single = null;
                }
                else
                {
                    if (_enginesByHostAndPrefix.Count == 0)
                    {
                        _single = environment;
                    }
                }

                if (EngineHelper.DefaultShellName == environment.Name)
                {
                    _default = environment;
                }

                var hostAndPrefix = GetHostAndPrefix(environment);
                _enginesByHostAndPrefix[hostAndPrefix] = environment;
            }
            finally
            {
                _lock.ExitWriteLock();
            }
        }

        public void Remove(EngineEnvironment environment)
        {
            _lock.EnterWriteLock();
            try
            {
                var hostAndPrefix = GetHostAndPrefix(environment);
                _enginesByHostAndPrefix.Remove(hostAndPrefix);

                if (_default == environment)
                {
                    _default = null;
                }

                if (_single == environment)
                {
                    _single = null;
                }
            }
            finally
            {
                _lock.ExitWriteLock();
            }
        }

        public EngineEnvironment Match(string host, string appRelativePath)
        {
            if (_single != null)
            {
                return _single;
            }

            _lock.EnterReadLock();
            try
            {
                string hostAndPrefix = GetHostAndPrefix(host, appRelativePath);

                EngineEnvironment result;
                if (!_enginesByHostAndPrefix.TryGetValue(hostAndPrefix, out result))
                {
                    var noHostAndPrefix = GetHostAndPrefix("", appRelativePath);

                    if (!_enginesByHostAndPrefix.TryGetValue(noHostAndPrefix, out result))
                    {
                        result = _default;
                    }
                }

                return result;
            }
            finally
            {
                _lock.ExitReadLock();
            }
        }

        private string GetHostAndPrefix(string host, string appRelativePath)
        {
            var hostLength = host.IndexOf(':');
            if (hostLength != -1)
            {
                host = host.Substring(0, hostLength);
            }

            int firstSegmentIndex = appRelativePath.IndexOf('/', 1);
            if (firstSegmentIndex > -1)
            {
                return host + appRelativePath.Substring(0, firstSegmentIndex);
            }
            else
            {
                return host + appRelativePath;
            }

        }

        private string GetHostAndPrefix(EngineEnvironment environment)
        {
            return environment.RequestUrlHost + "/" + environment.RequestUrlPrefix;
        }
    }
}
