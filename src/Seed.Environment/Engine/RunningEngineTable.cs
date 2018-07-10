using System;
using System.Collections.Generic;
using System.Linq;
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

        public EngineSettings Match(string host, string appRelativePath, bool fallbackToDefault = true)
        {
            _lock.EnterReadLock();
            try
            {
                if (TryMatchInternal(host, appRelativePath, fallbackToDefault, out EngineSettings result))
                {
                    return result;
                }

                if (_hasStarMapping && TryMatchStarMapping(host, appRelativePath, fallbackToDefault, out result))
                {
                    return result;
                }

                if (fallbackToDefault && DefaultIsCatchAll())
                {
                    return _default;
                }

                if (fallbackToDefault && TryMatchInternal("", "/", fallbackToDefault, out result))
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

        private bool TryMatchInternal(string host, string appRelativePath, bool fallbackToDefault, out EngineSettings result)
        {
            var hasPort = host.Contains(':');

            if (!hasPort || !_enginesByHostAndPrefix.TryGetValue(GetHostAndPrefix(host, appRelativePath, true), out result))
            {
                if (!_enginesByHostAndPrefix.TryGetValue(GetHostAndPrefix(host, appRelativePath, false), out result))
                {
                    if (!hasPort || !_enginesByHostAndPrefix.TryGetValue(GetHostAndPrefix(host, "/", true), out result))
                    {
                        if (!_enginesByHostAndPrefix.TryGetValue(GetHostAndPrefix(host, "/", false), out result))
                        {
                            if (!_enginesByHostAndPrefix.TryGetValue(GetHostAndPrefix("", appRelativePath, false), out result))
                            {
                                result = null;
                                return false;
                            }
                        }
                    }
                }
            }

            return true;
        }

        private bool TryMatchStarMapping(string host, string appRelativePath, bool fallbackToDefault, out EngineSettings result)
        {
            if (TryMatchInternal("*." + host, appRelativePath, fallbackToDefault, out result))
            {
                return true;
            }

            var index = -1;

            while (-1 != (index = host.IndexOf('.', index + 1)))
            {
                if (TryMatchInternal("*" + host.Substring(index), appRelativePath, fallbackToDefault, out result))
                {
                    return true;
                }
            }

            result = null;
            return false;
        }

        private string GetHostAndPrefix(string host, string appRelativePath, bool includePort)
        {
            if (!includePort)
            {
                var hostLength = host.IndexOf(':');
                if (hostLength != -1)
                {
                    host = host.Substring(0, hostLength);
                }
            }

            var firstSegmentIndex = appRelativePath.Length > 0 ? appRelativePath.IndexOf('/', 1) : -1;
            if (firstSegmentIndex > -1)
            {
                return host + appRelativePath.Substring(0, firstSegmentIndex);
            }
            else
            {
                return host + appRelativePath;
            }

        }

        private string[] GetAllHostsAndPrefix(EngineSettings engineSettings)
        {
            if (string.IsNullOrWhiteSpace(engineSettings.RequestUrlHost))
            {
                return new string[] { "/" + engineSettings.RequestUrlPrefix };
            }

            return engineSettings
                .RequestUrlHost
                .Split(new[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(ruh => ruh + "/" + engineSettings.RequestUrlPrefix ?? "")
                .ToArray();
        }

        private bool DefaultIsCatchAll()
        {
            return _default != null && string.IsNullOrEmpty(_default.RequestUrlHost) && string.IsNullOrEmpty(_default.RequestUrlPrefix);
        }
    }
}