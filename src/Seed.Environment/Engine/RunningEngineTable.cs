using Seed.Environment.Abstractions.Engine;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;

namespace Seed.Environment.Engine
{
    public class RunningEngineTable : IRunningEngineTable
    {
        private readonly Dictionary<string, EngineSettings> _enginesByHostAndPrefix = new Dictionary<string, EngineSettings>(StringComparer.OrdinalIgnoreCase);
        private readonly ReaderWriterLockSlim _lock = new ReaderWriterLockSlim();

        private EngineSettings _default;
        private bool _hasStarMapping = false;

        public void Add(EngineSettings settings)
        {
            _lock.EnterWriteLock();
            try
            {
                if (EngineHelper.DefaultEngineName == settings.Name)
                {
                    _default = settings;
                }

                var allHostsAndPrefix = GetAllHostsAndPrefix(settings);
                foreach (var hostAndPrefix in allHostsAndPrefix)
                {
                    _hasStarMapping = _hasStarMapping || hostAndPrefix.StartsWith("*");
                    _enginesByHostAndPrefix[hostAndPrefix] = settings;
                }
            }
            finally
            {
                _lock.ExitWriteLock();
            }
        }

        public EngineSettings Match(string host, string appRelativeCurrentExecutionFilePath)
        {
            _lock.EnterReadLock();
            try
            {
                if (TryMatchInternal(host, appRelativeCurrentExecutionFilePath, out EngineSettings result))
                {
                    return result;
                }

                if (_hasStarMapping && TryMatchStarMapping(host, appRelativeCurrentExecutionFilePath, out result))
                {
                    return result;
                }

                if (DefaultIsCatchAll())
                {
                    return _default;
                }

                if (TryMatchInternal("", "/", out result))
                {
                    return result;
                }

                return null;
            }
            finally
            {
                _lock.ExitReadLock();
            }
        }

        public void Remove(EngineSettings settings)
        {
            _lock.EnterWriteLock();
            try
            {
                var allHostsAndPrefix = GetAllHostsAndPrefix(settings);
                foreach (var hostAndPrefix in allHostsAndPrefix)
                {
                    _enginesByHostAndPrefix.Remove(hostAndPrefix);
                }

                if (_default == settings)
                {
                    _default = null;
                }
            }
            finally
            {
                _lock.ExitWriteLock();
            }
        }

        private bool TryMatchInternal(string host, string appRelativePath, out EngineSettings result)
        {
            var hostAndPrefix = GetHostAndPrefix(host, appRelativePath);

            if (!_enginesByHostAndPrefix.TryGetValue(hostAndPrefix, out result))
            {
                var hostAndNoPrefix = GetHostAndPrefix(host, "/");

                if (!_enginesByHostAndPrefix.TryGetValue(hostAndNoPrefix, out result))
                {
                    var noHostAndPrefix = GetHostAndPrefix("", appRelativePath);

                    if (!_enginesByHostAndPrefix.TryGetValue(noHostAndPrefix, out result))
                    {
                        result = null;
                        return false;
                    }
                }
            }

            return true;
        }

        private bool TryMatchStarMapping(string host, string appRelativePath, out EngineSettings result)
        {
            if (TryMatchInternal("*." + host, appRelativePath, out result))
            {
                return true;
            }

            var index = -1;

            while (-1 != (index = host.IndexOf('.', index + 1)))
            {
                if (TryMatchInternal("*" + host.Substring(index), appRelativePath, out result))
                {
                    return true;
                }
            }

            result = null;
            return false;
        }

        private string GetHostAndPrefix(string host, string appRelativePath)
        {
            var hostLength = host.IndexOf(':');
            if (hostLength != -1)
            {
                host = host.Substring(0, hostLength);
            }

            var firstSegmentIndex = appRelativePath.IndexOf('/', 1);
            if (firstSegmentIndex > -1)
            {
                return host + appRelativePath.Substring(0, firstSegmentIndex);
            }
            else
            {
                return host + appRelativePath;
            }

        }

        private string[] GetAllHostsAndPrefix(EngineSettings settings)
        {
            if (string.IsNullOrWhiteSpace(settings.RequestUrlHost))
            {
                return new string[] { "/" + settings.RequestUrlPrefix };
            }

            return settings
                .RequestUrlHost
                .Split(new[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(ruh => ruh + "/" + settings.RequestUrlPrefix ?? "")
                .ToArray();
        }

        private bool DefaultIsCatchAll()
        {
            return _default != null && string.IsNullOrEmpty(_default.RequestUrlHost) && string.IsNullOrEmpty(_default.RequestUrlPrefix);
        }
    }
}
