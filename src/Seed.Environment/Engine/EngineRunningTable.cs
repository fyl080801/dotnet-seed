using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class EngineRunningTable : IEngineRunningTable
    {
        private readonly Dictionary<string, EngineVariables> _enginesByHostAndPrefix = new Dictionary<string, EngineVariables>(StringComparer.OrdinalIgnoreCase);
        private readonly ReaderWriterLockSlim _lock = new ReaderWriterLockSlim();

        private EngineVariables _single;
        private EngineVariables _default;

        public void Add(EngineVariables variables)
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
                        _single = variables;
                    }
                }

                if (EngineHelper.DefaultShellName == variables.Name)
                {
                    _default = variables;
                }

                var hostAndPrefix = GetHostAndPrefix(variables);
                _enginesByHostAndPrefix[hostAndPrefix] = variables;
            }
            finally
            {
                _lock.ExitWriteLock();
            }
        }

        public void Remove(EngineVariables variables)
        {
            _lock.EnterWriteLock();
            try
            {
                var hostAndPrefix = GetHostAndPrefix(variables);
                _enginesByHostAndPrefix.Remove(hostAndPrefix);

                if (_default == variables)
                {
                    _default = null;
                }

                if (_single == variables)
                {
                    _single = null;
                }
            }
            finally
            {
                _lock.ExitWriteLock();
            }
        }

        public EngineVariables Match(string host, string appRelativePath)
        {
            if (_single != null)
            {
                return _single;
            }

            _lock.EnterReadLock();
            try
            {
                string hostAndPrefix = GetHostAndPrefix(host, appRelativePath);

                EngineVariables result;
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

        private string GetHostAndPrefix(EngineVariables variables)
        {
            return variables.RequestUrlHost + "/" + variables.RequestUrlPrefix;
        }
    }
}
